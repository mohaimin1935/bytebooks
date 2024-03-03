import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields from "@/middleware/mandatoryFieldList";

// CREATE A BOOK INFO
export const POST = async (req) => {
  // const authError = await creatorOnlyFailed();
  // if (authError) {
  //   return authError;
  // }

  try {
    const body = await req.json();

    //input validation
    const { isValid, missingFields } = validateMandatoryFields(
      "BookInfo",
      body
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Missing mandatory fields", missingFields },
        { status: 400 }
      );
    }

    const bookInfo = await prisma.bookInfo.create({
      data: {
        isbn: body.isbn,
        language: body.language,
        publishingYear: body.publishingYear,
        title: body.title,
        image: body.image,
        intro: body.intro,
        desc: body.desc,
        authors: {
          create: body.authorIds?.map((authorId) => ({ authorId })),
        },
        tags: {
          create: body.tagIds?.map((tagId) => ({ tagId })),
        },
        genres: {
          create: body.genreIds?.map((genreId) => ({ genreId })),
        },
        creators: {
          create: body.creatorIds?.map((creatorId) => ({ creatorId })),
        },
      },
    });

    return NextResponse.json(bookInfo, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// export const GET = async (req,{ query }) => {

//   try {
//     // const books = await prisma.bookInfo.findMany({
//     //   include: {
//     //     authors: {
//     //       include: {
//     //         author: true,
//     //       },
//     //     },
//     //     genres: {
//     //       include: {
//     //         genre: true,
//     //       },
//     //     },
//     //   },
//     // });
//     // console.log(query);
//     // const query = query || {};
//     const creatorId = query.creatorId;

//     let books;
//     if (creatorId) {
//       // Fetch book creators (and their associated books) by the provided creatorId
//       const bookCreators = await prisma.bookCreator.findMany({
//         where: {
//           creatorId: creatorId
//         },
//         include: {
//           book: {
//             include: {
//               authors: {
//                 include: {
//                   author: true
//                 }
//               },
//               genres: {
//                 include: {
//                   genre: true
//                 }
//               }
//             }
//           }
//         }
//       });

//       // Extract the books from the book creators
//       books = bookCreators.map(bc => bc.book);

//     } else {
//       // If no creatorId is provided, fetch all books
//       books = await prisma.bookInfo.findMany({
//         include: {
//           authors: {
//             include: {
//               author: true
//             }
//           },
//           genres: {
//             include: {
//               genre: true
//             }
//           }
//         }
//       });
//     }

//     return NextResponse.json(books);
//     //const books = await prisma.bookInfo.findMany();

//     //return NextResponse.json(books);
//   } catch (err) {
//     console.log(err);

//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// };

// export const GET = async (req) => {
//   try {

//     const url = req.nextUrl;

//     const searchParams = url.searchParams;

//     const creatorId = searchParams.get('creatorId');
//     //console.log(creatorId);

//     let books;
//     if (creatorId) {
//       // Fetch books by creatorId
//       const bookCreators = await prisma.bookCreator.findMany({
//         where: { creatorId },
//         include: {
//           book: {
//             include: {
//               authors: { include: { author: true }},
//               genres: { include: { genre: true }}
//             }
//           }
//         }
//       });
//       books = bookCreators.map(bc => bc.book);
//     } else {
//       // Fetch all books
//       books = await prisma.bookInfo.findMany({
//         include: {
//           authors: { include: { author: true }},
//           genres: { include: { genre: true }}
//         }
//       });
//     }

//     return NextResponse.json(books);
//   } catch (err) {
//     console.error("Error: ", err.message);
//     return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//   }
// };

function parseBoolean(str) {
  return str === "true" || str === "1";
}

export const GET = async (req) => {
  try {
    const url = req.nextUrl;
    const searchParams = url.searchParams;
    let a = [];
    if (searchParams.has("creatorId")) {
      let r = await prisma.BookCreator.findMany({
        where: {
          creatorId: searchParams.get("creatorId"),
        },
        select: {
          bookId: true,
        }
      });
      console.log(r);
      for (let i=0;i<r.length;i++) {
        a.push(r[i].bookId);
      }
      console.log(a);
    }

    // Initialize an empty filter object
    let filter = {};

    // Example search parameters based on your schema
    if (searchParams.has("isbn")) {
      filter.isbn = searchParams.get("isbn");
    }
    if (searchParams.has("publishingYear")) {
      filter.publishingYear = parseInt(searchParams.get("publishingYear"), 10);
    }
    if (searchParams.has("title")) {
      filter.title = searchParams.get("title");
    }
    if (searchParams.has("creatorId")) {
      filter.id = {in: a};
    }
    if (searchParams.has("isPublished")) {
      filter.isPublished = parseBoolean(searchParams.get("isPublished"));
    }
    // Add more filters as needed
    console.log(filter);

    let books = await prisma.bookInfo.findMany({
      where: filter,
      include: {
        authors: { include: { author: true } },
        genres: { include: { genre: true } },
        alternateBook: true,
        // Include other relations as needed
      },
    });
    console.log("book:",books);
    return NextResponse.json(books);
  } catch (err) {
    console.error("Error: ", err.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
