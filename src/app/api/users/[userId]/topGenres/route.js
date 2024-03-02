import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { userId } = params;

  try {
    const bookUsers = await prisma.bookUser.findMany({
      where: {
        userId,
      },
    });

    let genreCounts = {};

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

      book.genres.forEach(({ genre }) => {
        if (!genreCounts[genre.id]) {
          genreCounts[genre.id] = {
            count: 0,
            name: genre.name,
          };
        }
        genreCounts[genre.id].count++;
      });
    });

    console.log(genreCounts);

    return NextResponse.json("hello");
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
