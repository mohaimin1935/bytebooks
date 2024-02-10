// file-status: need to work

import { selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields from "@/middleware/mandatoryFieldList";

export const GET = async (req, { params }) => {
  // self validation checks both login status and userid match
  // const authError = await selfValidationOnlyFailed(params.userId);
  // if (authError) {
  //   return authError;
  // }
  try {
    const url = req.nextUrl;
    const searchParams = url.searchParams;

    // Initialize an empty filter object
    let filter = {};

    // Example search parameters based on your schema
    // if no type then show latest
    filter.type = "latest";
    if (searchParams.has("type")) {
      filter.type = searchParams.get("type");
    }
    //if no count then default count 20
    filter.count = 20;
    if (searchParams.has("count")) {
      filter.count = parseInt(searchParams.get("count"), 10);
    }
    //if no page index default page index 0
    filter.page = 0;
    if (searchParams.has("page")) {
      filter.page = parseInt(searchParams.get("page"), 10);
    }

    // Add more filters as needed
    console.log(filter);

    //need to fix logic #check
    let results = [];
    if (filter.type === "latest") {

      results = await prisma.bookInfo.findMany({
        skip: filter.count * filter.page,
        take: filter.count,
        orderBy: {
          updatedAt: 'desc', // Assuming 'updatedAt' is a field indicating when the book was added
        },
        include: {
          authors: { include: { author: true } },
          genres: { include: { genre: true } },
        },
      });

    } else if (filter.type === "continue") {
      const { userId } = params; // Ensure 'userId' is obtained correctly
      if (!userId) {
        return NextResponse.json({ error: "User ID is required for 'continue' filter" }, { status: 400 });
      }

      // Fetch books that the user has started reading but not finished
      results = await prisma.bookUser.findMany({
        where: {
          userId: userId,
          status: "reading", 
        },
        skip: filter.count * filter.page,
        take: filter.count,
        include: {
          book: {
            include: {
              authors: { include: { author: true } },
              genres: { include: { genre: true } },
            },
          },
        },
      });
      results = results.map(result => result.book); 
    } else if (filter.type === "trending") {
      //logic: get those books that are most in number in bookuser table in last 7 days

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Fetch BookUser entries updated within the last week and count them by bookId
      const recentInteractions = await prisma.bookUser.groupBy({
        by: ['bookId'],
        where: {
          updatedAt: {
            gte: oneWeekAgo,
          },
        },
        _count: {
          bookId: true,
        },
        orderBy: {
          _count: {
            bookId: 'desc',
          },
        },
        take: filter.count,
        skip: filter.count * filter.page,
      });

      // Extract bookIds from the grouped results
      const trendingBookIds = recentInteractions.map(entry => entry.bookId);

      // Fetch the book details for these trending bookIds
      results = await prisma.bookInfo.findMany({
        where: {
          id: {
            in: trendingBookIds,
          },
        },
        include: {
          authors: { include: { author: true } },
          genres: { include: { genre: true } },
        },
      });


    } else if (filter.type === "recommended") {
      //implement the recommanded books in such a way that you look into a user's bookmarked books and see what the genres are. then fetch books that are the same genre but havenot been read before

      const { userId } = params; // Ensure 'userId' is correctly obtained
    if (!userId) {
        return NextResponse.json({ error: "User ID is required for 'recommended' filter" }, { status: 400 });
    }

    // Fetch the genres of the user's bookmarked books
    const bookmarkedBooksGenres = await prisma.bookUser.findMany({
        where: {
            userId: userId,
            isBookmarked: true, // Assuming there's an `isBookmarked` field
        },
        include: {
            book: {
                include: {
                    genres: true, // Assuming a book has a relation to genres
                },
            },
        },
    });

    // Extract unique genre IDs from bookmarked books
    let genreIds = [];
    bookmarkedBooksGenres.forEach(entry => {
        entry.book.genres.forEach(genre => {
            if (!genreIds.includes(genre.id)) {
                genreIds.push(genre.id);
            }
        });
    });

    // Fetch unread books in these genres
    const unreadBooksInGenres = await prisma.bookInfo.findMany({
        where: {
            AND: [
                { genres: { some: { id: { in: genreIds } } } }, // Books in the bookmarked genres
                { NOT: { bookUsers: { some: { userId: userId, status: "read" } } } } // That the user hasn't read
            ],
        },
        skip: filter.count * filter.page,
        take: filter.count,
        include: {
            authors: { include: { author: true } },
            genres: { include: { genre: true } },
        },
    });

    results = unreadBooksInGenres;
    }
    // results = await prisma.BookUser.findMany({
    //   skip: filter.count * filter.page,
    //   take: filter.count,
    //   // where: {
    //   //   userId: params.userId,
    //   // },
    //   // include: {
    //   //     book: true,
    //   // }
    // });
    // console.log(results);
    // let res = [];
    // for (let i = 0; i < results.length; i++) {
    //   res.push(results[i].bookId);
    // }
    // console.log(res);
    // let books = await prisma.bookInfo.findMany({
    //   where: {
    //     // id: {
    //     //   in: res,
    //     // },
    //   },
    //   include: {
    //     authors: { include: { author: true } },
    //     genres: { include: { genre: true } },
    //     // Include other relations as needed
    //   },
    // });
    return NextResponse.json(results);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
