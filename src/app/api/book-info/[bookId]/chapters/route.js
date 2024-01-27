// file-status: need to work


import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// need to add authentication check and other error codes
export const GET = async (req,{params}) => {
    //console.log(params.userId);
  try {
    const chapters = await prisma.BookInfo.findUnique({
        where: {
            id: params.bookId,
        },
        select: {
            chapters: true,
        }
    });
    console.log(chapters)
    return NextResponse.json(chapters);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// need to add authentication check and other error codes
export const POST = async (req,{params}) => {
    console.log(params);
  try {
    const body = await req.json();
    const chapter = await prisma.Chapter.create({
        data: {
            bookId: params.bookId,
            serial: body.serial,
            title: body.title,
            content: body.content,
            audioLink: body.audio,
            language: body.language,
        },
    });
    console.log(chapter);
    return NextResponse.json(chapter);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};


