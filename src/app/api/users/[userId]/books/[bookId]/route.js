import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A BOOKUSER ENTRY
export const POST = async (req, { params }) => {
  const { userId, bookId } = params;

  // Adjusting to the updated model fields
  const body = await req.json();

  if (!userId || !bookId || !body?.status) {
    return NextResponse.json(
      { error: "Missing mandatory fields" },
      { status: 400 }
    );
  }

  try {
    // Attempt to find an existing BookUser entry
    const existingEntry = await prisma.bookUser.findUnique({
      where: {
        userId_bookId: { userId, bookId }, // Composite key
      },
    });

    let bookUser;
    if (existingEntry) {
      // Update the existing entry if it's found
      bookUser = await prisma.bookUser.update({
        where: {
          id: existingEntry.id,
        },
        data: body,
      });
    } else {
      // Create a new BookUser entry if no existing entry is found
      bookUser = await prisma.bookUser.create({
        data: body,
      });
    }

    return NextResponse.json(bookUser, { status: 200 });
  } catch (error) {
    console.error("Request error:", error);
    // Ensure an error response is returned
    return NextResponse.json(
      {
        error: "Error creating or updating BookUser entry",
        errorMessage: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req, { params }) => {
  const { userId, bookId } = params;

  if (!userId || !bookId) {
    // If userId or bookId are missing, return an error response
    return NextResponse.json(
      { error: "Missing userId or bookId in parameters" },
      { status: 400 }
    );
  }

  try {
    // Attempt to find the BookUser entry based on userId and bookId
    const bookUser = await prisma.bookUser.findUnique({
      where: {
        userId_bookId: { userId, bookId }, // Composite key
      },
      // Optionally include related models like chapter or byte if needed
      include: {
        chapter: true,
        byte: true,
      },
    });

    if (!bookUser) {
      // If no entry is found, return a not found response
      return NextResponse.json(
        { error: "BookUser entry not found" },
        { status: 404 }
      );
    }

    // If an entry is found, return it
    return NextResponse.json(bookUser, { status: 200 });
  } catch (error) {
    console.error("Request error:", error);
    // Ensure an error response is returned in case of an exception
    return NextResponse.json(
      {
        error: "Error fetching BookUser entry",
        errorMessage: error.message,
      },
      { status: 500 }
    );
  }
};
