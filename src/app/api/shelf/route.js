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
    const userId = req.nextUrl.searchParams.get("userid");
    console.log(userId);
  try {
    const shelf = await prisma.Shelf.findMany({
        where: {
            userId: userId,
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
export const POST = async (req,{params}) => {
    //   const authError = await selfValidationOnlyFailed();
    //   if (authError) {
    //     return authError;
    //   }
        
      try {
        const body = await req.json();
        console.log(body);
        const shelf = await prisma.Shelf.create({
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


