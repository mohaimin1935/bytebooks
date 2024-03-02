import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { bookId } = params;

  try {
    // Counting the number of 'BookUser' entries where 'isBookmarked' is true for the given 'bookId'
    const bookmarkCount = await prisma.bookUser.count({
      where: {
        bookId: bookId, // Matching the bookId
        isBookmarked: true, // Where the entry is marked as a bookmark
      },
    });

    console.log(bookmarkCount);
    // Returning the count of bookmarks
    return NextResponse.json({ bookmarkCount: bookmarkCount });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
