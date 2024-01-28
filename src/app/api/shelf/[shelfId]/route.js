// file-status: need to work


import { authenticatedOnlyFailed, creatorOnlyFailed, selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// need to check error condition
export const GET = async (req,{params}) => {
//   const authError = await selfValidationOnlyFailed();
//   if (authError) {
//     return authError;
//   }
  try {
    const shelf = await prisma.Shelf.findUnique({
        where: {
            id: params.shelfId,
        },
        select: {
            id: true,
            status: true,
            userId: true,
            bookId: true,
        },
    });
    return NextResponse.json(shelf);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// need to check error condition
export const PUT = async (req,{params}) => {
    //   const authError = await selfValidationOnlyFailed();
    //   if (authError) {
    //     return authError;
    //   }
    
    try {
        const body = await req.json();
        console.log(body);
        const shelf = await prisma.Shelf.update({
            where: {
                id: params.shelfId,
            },
            data: {
                status: body.status,
                userId: body.userid,
                bookId: body.bookid,
            },
            select: {
                id: true,
                status: true,
                userId: true,
                bookId: true,
            },
        });
        return NextResponse.json(shelf);
    } catch (err) {
    console.log(err);

    

    return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
    );
    }
};


// need to check error condition
export const DELETE = async (req,{params}) => {
    //   const authError = await selfValidationOnlyFailed();
    //   if (authError) {
    //     return authError;
    //   }
    
    try {
        const shelf = await prisma.Shelf.delete({
            where: {
                id: params.shelfId,
            },
        });
        return NextResponse.json(
            { message: "done" },
            { status: 200 });
    } catch (err) {
    console.log(err);

    

    return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
    );
    }
};

