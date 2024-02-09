// file-status: need to work


import { adminOnlyFailed, authenticatedOnlyFailed, creatorOnlyFailed, selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// need to check error condition
export const GET = async (req,{params}) => {
    // for user need to add self validation and for admin adminonly check

    // const authError = await adminOnlyFailed();
    // if (authError) {
    //     return authError;
    // }

    /*
        example response body

        {
            "id": "clsetshsp00013dluapa5nt57",
            "userId": "cls50m1zi000boydt9cuwr05i",
            "bookId": "cls50ph5c001r1aih26119zp3",
            "chapterId": "cls530qdy0007ohn114omkv17",
            "byteId": null,
            "comment": "vulgar content",
            "status": "pending"
        }

    */
    

  try {
    const res = await prisma.ContentReport.findUnique({
        where: {
            id: params.reportId,
        },
        select: {
            id: true,
            userId: true,
            bookId: true,
            chapterId: true,
            byteId: true,
            comment: true,
            status: true,
        },
    });
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// need to check error condition
export const PATCH = async (req,{params}) => {
    // can user change a report say comment?
    //   const authError = await adminOnlyFailed();
    //   if (authError) {
    //     return authError;
    //   }
        
    try {
        /*
            example request body, optional fields are marked with *
            {
                "status": "positive"
            }

        */
        const body = await req.json();
        console.log(body);
        const res = await prisma.ContentReport.update({
            where: {
                id: params.reportId,
            },
            data: body,
            select: {
                id: true,
                userId: true,
                bookId: true,
                chapterId: true,
                byteId: true,
                comment: true,
                status: true,
            },
        });
        return NextResponse.json(res);
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
    // can user change a report say comment?
    //   const authError = await adminOnlyFailed();
    //   if (authError) {
    //     return authError;
    //   }
        
    try {

        const res = await prisma.ContentReport.delete({
            where: {
                id: params.reportId,
            },
        });
        return NextResponse.json(
            { message: "success" },
            { status: 200 }
        );
    } catch (err) {
        
        console.log(err);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }

};


