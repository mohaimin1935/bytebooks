import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { bookId } = params;

  //console.log("test", bookId);
  try {
    const book = await prisma.bookInfo.findUnique({
      where: {
        id: bookId,
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    //console.log(book);
    return NextResponse.json(book);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// TODO: PATCH
// TODO: DELETE

export const PATCH = async (req, { params }) => {
    const { bookId } = params;
    try {
        const body = await req.json(); // Parse the request body

        // Check if the book exists
        const existingBook = await prisma.bookInfo.findUnique({
            where: {
                id: bookId,
            },
        });

        // If the book does not exist, return a 404 status with a message
        if (!existingBook) {
            return NextResponse.json(
                { message: "Book not found" },
                { status: 404 }
            );
        }

        // Update the book with the new data
        const updatedBook = await prisma.bookInfo.update({
            where: {
                id: bookId,
            },
            data: body,
        });

        // Return the updated book
        return NextResponse.json(updatedBook);
    } catch (err) {
        console.error(err);

        // In case of any server-side error, return a 500 status with a generic error message
        return NextResponse.json(
            { message: "Something went wrong", error: err.message },
            { status: 500 }
        );
    }
};

