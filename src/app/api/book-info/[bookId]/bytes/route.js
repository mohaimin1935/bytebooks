// file-status: need to work
// don't change without notifying @zulkar


import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// need to add authentication check and other error codes
export const GET = async (req,{params}) => {
    //console.log(params.userId);
  try {
    const byte = await prisma.BookInfo.findUnique({
        where: {
            id: params.bookId,
        },
        select: {
            byte: true,
        }
    });
    console.log(byte)
    return NextResponse.json(byte);
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
    const byte = await prisma.Byte.create({
        data: {
            bookId: params.bookId,
            serial: body.serial,
            title: body.title,
            content: body.content,
            audioLink: body.audio,
            language: body.language,
        },
    });
    console.log(byte);
    return NextResponse.json(byte);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};


