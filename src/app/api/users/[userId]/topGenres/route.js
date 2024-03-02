import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

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

    //console.log(Books);
    let booksByGenre = {};
    Books.forEach(({ book }) => {
      book.genres.forEach(({ genre }) => {
        if (genre && genre.id) {
          if (!booksByGenre[genre.id]) {
            booksByGenre[genre.id] = { count: 0, genreName: genre.name };
          }
          booksByGenre[genre.id].count++;
        }
        //genreCounts[genre.id].count++;
      });
    });

    return NextResponse.json({ booksByGenre });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
