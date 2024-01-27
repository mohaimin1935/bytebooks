import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { bookId } = params;

  console.log("test", bookId);
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

    console.log(book);
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
