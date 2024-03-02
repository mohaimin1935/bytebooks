import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Existing code for genres...
    // Skipping for brevity

    // Fetch authors and books to count books per author
    const authorsWithBooks = await prisma.author.findMany({
      include: {
        books: true, // Assuming a direct relationship for simplicity
      },
    });

    const booksPerAuthor = authorsWithBooks.map((author) => ({
      authorId: author.id,
      authorName: author.name,
      count: author.books.length,
    }));

    // Fetch all books with their authors for rating aggregation
    const booksWithRatingsAndAuthors = await prisma.bookInfo.findMany({
      where: {
        rating: {
          not: null,
        },
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
      },
    });

    // Aggregate ratings by author
    let ratingsByAuthor = {};
    booksWithRatingsAndAuthors.forEach((book) => {
      book.authors.forEach(({ author }) => {
        if (!ratingsByAuthor[author.id]) {
          ratingsByAuthor[author.id] = {
            totalRating: 0,
            count: 0,
            name: author.name,
          };
        }
        ratingsByAuthor[author.id].totalRating += book.rating;
        ratingsByAuthor[author.id].count++;
      });
    });

    // For bookmarked books by author
    const bookmarkedBooksByAuthor = await prisma.bookUser.findMany({
      where: {
        isBookmarked: true,
      },
      include: {
        book: {
          include: {
            authors: {
              include: {
                author: true,
              },
            },
          },
        },
      },
    });

    let bookmarksByAuthor = {};
    bookmarkedBooksByAuthor.forEach(({ book }) => {
      book.authors.forEach(({ author }) => {
        if (!bookmarksByAuthor[author.id]) {
          bookmarksByAuthor[author.id] = {
            totalCount: 0,
            name: author.name,
          };
        }
        bookmarksByAuthor[author.id].totalCount =
          (bookmarksByAuthor[author.id].totalCount || 0) + 1;
      });
    });

    // Constructing the response with both genre and author data
    const response = {
      // Include previously constructed genre-related response
      booksPerAuthor,
      ratingsByAuthor: Object.entries(ratingsByAuthor).map(
        ([authorId, data]) => ({
          authorId,
          authorName: data.name,
          averageRating: data.totalRating / data.count,
          bookCount: data.count,
        })
      ),
      bookmarksByAuthor: Object.entries(bookmarksByAuthor).map(
        ([authorId, data]) => ({
          authorId,
          authorName: data.name,
          bookmarkCount: data.totalCount,
        })
      ),
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
