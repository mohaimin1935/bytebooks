import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// export const GET = async (req, { params }) => {
//   const { userId } = params;

//   try {
//     const bookUsers = await prisma.bookUser.findMany({
//       where: {
//         userId,
//       },
//     });

//     console.log(bookUsers);

//     let genreCounts = {};

//     bookUsers.forEach(async (bookUser) => {
//       const book = await prisma.bookInfo.findUnique({
//         where: {
//           id: bookUser.bookId,
//         },
//         include: {
//           genres: {
//             include: {
//               genre: true,
//             },
//           },
//         },
//       });
//       console.log(book.genres);

//       book.genres.forEach((genre) => {
//         console.log(genre.genre.name);
//         if (genreCounts[genre.genre.name]) {
//           console.log("first");
//           genreCounts[genre.genre.name]++;
//         } else {
//           console.log("sec");
//           genreCounts[genre.genre.name] = 1;
//         }
//       });
//     });

//     console.log(genreCounts);

//     return NextResponse.json("hello");
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// };

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const Books = await prisma.bookUser.findMany({
      where: {
        userId: userId,
      },
    });

    let genreCounts = {};

    const genres = await prisma.genre.findMany();
    genres.forEach((genre) => {
      genreCounts[genre.id] = {
        count: 0,
        name: genre.name,
      };
    });

    bookUsers?.forEach(async (bookUser) => {
      const book = await prisma.bookInfo.findUnique({
        where: {
          id: bookUser.bookId,
        },
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
      });

    //console.log(Books);
    let booksByGenre = {};
    Books.forEach(({ book }) => {
      book.genres.forEach(({ genre }) => {
        // if (!genreCounts[genre.id]) {
        //   genreCounts[genre.id] = {
        //     count: 1,
        //     name: genre.name,
        //   };
        // }
        genreCounts[genre.id].count++;
      });
    });

    console.log(genreCounts);

    return NextResponse.json(genreCounts);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
