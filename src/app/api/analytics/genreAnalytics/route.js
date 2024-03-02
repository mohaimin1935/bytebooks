import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Fetch genres and books to manually count books per genre
    const genresWithBooks = await prisma.genre.findMany({
      include: {
        books: true, // This will include all BookGenre relations, not direct BookInfo counts
      },
    });

    const booksPerGenre = genresWithBooks.map((genre) => ({
      genreId: genre.id,
      genreName: genre.name,
      count: genre.books.length,
    }));

    // Fetch all books with their genres for rating aggregation
    const booksWithRatings = await prisma.bookInfo.findMany({
      where: {
        rating: {
          not: null,
        },
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    // Aggregate ratings by genre
    let ratingsByGenre = {};
    booksWithRatings.forEach((book) => {
      book.genres.forEach(({ genre }) => {
        if (!ratingsByGenre[genre.id]) {
          ratingsByGenre[genre.id] = {
            totalRating: 0,
            count: 0,
            name: genre.name,
          };
        }
        ratingsByGenre[genre.id].totalRating += book.rating;
        ratingsByGenre[genre.id].count++;
      });
    });

    // Calculate average rating per genre and find the highest
    // let highestAverageRating = { genreId: null, averageRating: 0 };
    // for (const [genreId, { totalRating, count }] of Object.entries(
    //   ratingsByGenre
    // )) {
    //   const averageRating = totalRating / count;
    //   if (averageRating > highestAverageRating.averageRating) {
    //     highestAverageRating = { genreId, averageRating };
    //   }
    // }

    // For the most bookmarked genre, fetch books with bookmarks and aggregate by genre
    const bookmarkedBooks = await prisma.bookUser.findMany({
      where: {
        isBookmarked: true,
      },
      include: {
        book: {
          include: {
            genres: {
              include: {
                genre: true,
              },
            },
          },
        },
      },
    });

    let bookmarksByGenre = {};
    bookmarkedBooks.forEach(({ book }) => {
      book.genres.forEach(({ genre }) => {
        if (!bookmarksByGenre[genre.id]) {
          bookmarksByGenre[genre.id] = {
            totalCount: 0,
            name: genre.name,
          };
        }
        bookmarksByGenre[genre.id].totalCount =
          (bookmarksByGenre[genre.id].totalCount || 0) + 1;
      });
    });

    // Find the genre with the most bookmarks
    // let mostBookmarks = { genreId: null, count: 0 };
    // for (const [genreId, count] of Object.entries(bookmarksByGenre)) {
    //   if (count > mostBookmarks.count) {
    //     mostBookmarks = { genreId, count };
    //   }
    // }

    // Constructing the response
    // const response = {
    //   booksPerGenre,
    //   mostPopularGenre: highestAverageRating,
    //   mostBookmarkedGenre: mostBookmarks,
    // };
    const response = {
      booksPerGenre,
      ratingsByGenre,
      bookmarksByGenre,
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
