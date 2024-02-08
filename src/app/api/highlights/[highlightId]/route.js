// file-status: need to work


import { authenticatedOnlyFailed, creatorOnlyFailed, selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

export const GET = async (req,{params}) => {

  try {
    const res = await prisma.Highlights.findUnique({
        where: {
            id: params.highlightId,
        },
        select: {
            id: true,
            userId: true,
            bookId: true,
            chapterId: true,
            byteId: true,
            startIndex: true,
            endIndex: true
        }
    });
    console.log(res);
    if (!res) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
          );
    }
    // const authError = await selfValidationOnlyFailed(res.userId);
    // if (authError) {
    //   return authError;
    // }
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req,{params}) => {

    try {
        const body = await req.json();
      const res = await prisma.Highlights.findUnique({
          where: {
              id: params.highlightId,
          },
          select: {
              id: true,
              userId: true,
              bookId: true,
              chapterId: true,
              byteId: true,
              startIndex: true,
              endIndex: true
          }
      });
      console.log(res);
      if (!res) {
          return NextResponse.json(
              { message: "Not found" },
              { status: 404 }
            );
      }
    //   const authError = await selfValidationOnlyFailed(res.userId);
    //   if (authError) {
    //     return authError;
    //   }
      const result = await prisma.Highlights.update({
        where: {
            id: params.highlightId,
        },
        data: body,
        select: {
            id: true,
            userId: true,
            bookId: true,
            chapterId: true,
            byteId: true,
            startIndex: true,
            endIndex: true
        }
    });
      return NextResponse.json(result);
    } catch (err) {
      console.log(err);
  
      
  
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  };


export const DELETE = async (req,{params}) => {
  // self validation checks both login status and userid match
  try {
    const res = await prisma.Highlights.findUnique({
        where: {
            id: params.highlightId,
        },
        select: {
            id: true,
            userId: true,
            bookId: true,
            chapterId: true,
            byteId: true,
            startIndex: true,
            endIndex: true
        }
    });
    console.log(res);
    if (!res) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
          );
    }
  //   const authError = await selfValidationOnlyFailed(res.userId);
  //   if (authError) {
  //     return authError;
  //   }
    const r = await prisma.Highlights.delete({
        where: {
            id: params.highlightId,
        },
    });
    return NextResponse.json(
        {message: "success"},
        {status: 200}           //check status code
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
