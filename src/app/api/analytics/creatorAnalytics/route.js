import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Fetch creators and their books to count books per creator
    const creatorsWithBooks = await prisma.bookCreator.findMany({
      include: {
        creator: true,
        book: true,
      },
    });

    let booksPerCreator = {};
    creatorsWithBooks.forEach(({ creator, book }) => {
      if (!booksPerCreator[creator.id]) {
        booksPerCreator[creator.id] = { count: 0, name: creator.name };
      }
      booksPerCreator[creator.id].count++;
    });

    // Convert booksPerCreator to array for response
    booksPerCreator = Object.entries(booksPerCreator).map(
      ([creatorId, data]) => ({
        creatorId,
        creatorName: data.name,
        bookCount: data.count,
      })
    );

    // Fetch all books with their creators for rating aggregation
    const booksWithRatings = await prisma.bookInfo.findMany({
      where: {
        rating: {
          not: null,
        },
      },
      include: {
        creators: {
          include: {
            creator: true,
          },
        },
      },
    });

    // Aggregate ratings by creator
    let ratingsByCreator = {};
    booksWithRatings.forEach((book) => {
      book.creators.forEach(({ creator }) => {
        if (!ratingsByCreator[creator.id]) {
          ratingsByCreator[creator.id] = {
            totalRating: 0,
            count: 0,
            name: creator.name,
          };
        }
        ratingsByCreator[creator.id].totalRating += book.rating;
        ratingsByCreator[creator.id].count++;
      });
    });

    // Convert ratingsByCreator to array for response
    ratingsByCreator = Object.entries(ratingsByCreator).map(
      ([creatorId, data]) => ({
        creatorId,
        creatorName: data.name,
        averageRating: data.totalRating / data.count,
      })
    );

    // Aggregate bookmarks by creator
    let bookmarksByCreator = {};
    await Promise.all(
      creatorsWithBooks.map(async ({ creator, book }) => {
        const count = await prisma.bookUser.count({
          where: {
            bookId: book.id,
            isBookmarked: true,
          },
        });

        if (!bookmarksByCreator[creator.id]) {
          bookmarksByCreator[creator.id] = {
            totalCount: 0,
            name: creator.name,
          };
        }
        bookmarksByCreator[creator.id].totalCount += count;
      })
    );

    // Convert bookmarksByCreator to array for response
    bookmarksByCreator = Object.entries(bookmarksByCreator).map(
      ([creatorId, data]) => ({
        creatorId,
        creatorName: data.name,
        bookmarkCount: data.totalCount,
      })
    );

    const response = {
      booksPerCreator,
      ratingsByCreator,
      bookmarksByCreator,
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
