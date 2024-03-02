import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Total number of books
    const totalBooks = await prisma.bookInfo.count();

    // New books added within the last day
    const newBooks = await prisma.bookInfo.count({
      where: {
        createdAt: {
          gte: oneDayAgo,
        },
      },
    });

    // Top  most bookmarked books
    const mostBookmarkedBooks = await prisma.bookUser.groupBy({
      by: ["bookId"],
      _count: {
        bookId: true,
      },
      where: {
        isBookmarked: true,
      },
      orderBy: {
        _count: {
          bookId: "desc",
        },
      },
    });

    //Top  popular books based on user ratings
    const topRatedBooks = await prisma.bookInfo.findMany({
      where: {
        rating: {
          not: null,
        },
      },
      orderBy: {
        rating: "desc",
      },
    });

    const response = {
      totalBooks,
      newBooks,
      mostBookmarkedBooks: mostBookmarkedBooks.map((book) => ({
        bookId: book.bookId,
        count: book._count.bookId,
      })),
      topRatedBooks: topRatedBooks.map((book) => ({
        bookId: book.bookId,
        averageRating: book.rating,
      })),
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error: ", err.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
