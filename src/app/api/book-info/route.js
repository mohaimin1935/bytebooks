import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A BOOK INFO
export const POST = async (req) => {
  const authError = await creatorOnlyFailed();
  if (authError) {
    return authError;
  }

  try {
    const body = await req.json();

    const bookInfo = await prisma.bookInfo.create({
      data: {
        ...body,
        authors: {
          create: body.authorIds.map((authorId) => ({ authorId })),
        },
        tags: {
          create: body.tagIds.map((tagId) => ({ tagId })),
        },
        genres: {
          create: body.genreIds.map((genreId) => ({ genreId })),
        },
        creators: {
          create: body.creatorIds.map((creatorId) => ({ creatorId })),
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
