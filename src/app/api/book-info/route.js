import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// CREATE A BOOK INFO
export const POST = async (req) => {
  // const authError = await creatorOnlyFailed();
  // if (authError) {
  //   return authError;
  // }

  try {
    const body = await req.json();

    //input validation
     const { isValid, missingFields } = validateMandatoryFields('BookInfo', body);

        if (!isValid) {
            return NextResponse.json(
                { message: "Missing mandatory fields", missingFields },
                { status: 400 }
            );
        }


    const bookInfo = await prisma.bookInfo.create({
      data: {
        isbn: body.isbn,
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

export const GET = async (req) => {

  try {
    const books = await prisma.bookInfo.findMany({
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    //const books = await prisma.bookInfo.findMany();

    return NextResponse.json(books);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

