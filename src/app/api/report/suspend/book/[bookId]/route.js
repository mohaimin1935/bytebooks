// file-status: need to work


import { adminOnlyFailed, authenticatedOnlyFailed, creatorOnlyFailed, selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// need to check error condition
// export const GET = async (req,{params}) => {
//     // const authError = await adminOnlyFailed();
//     // if (authError) {
//     //     return authError;
//     // }

//     /*
//         example response body
//         [
//             {
//                 "id": "clsetshsp00013dluapa5nt57",
//                 "userId": "cls50m1zi000boydt9cuwr05i",
//                 "bookId": "cls50ph5c001r1aih26119zp3",
//                 "chapterId": "cls530qdy0007ohn114omkv17",
//                 "byteId": null,
//                 "comment": "vulgar content",
//                 "status": "pending"
//             }
//         ]

//     */
    

//   try {
//     const res = await prisma.ContentReport.findMany({
//         where: {
//             status: "pending",
//         },
//         select: {
//             id: true,
//             userId: true,
//             bookId: true,
//             chapterId: true,
//             byteId: true,
//             comment: true,
//             status: true,
//         },
//     });
//     return NextResponse.json(res);
//   } catch (err) {
//     console.log(err);

    

//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// };

// need to check error condition
export const POST = async (req,{params}) => {

    //   const authError = await authenticatedOnlyFailed();
    //   if (authError) {
    //     return authError;
    //   }
        
    try {
        /*
            example request body, optional fields are marked with *
            {
                "userId":,
                "bookId":,
                *"chapterId":,
                *"byteId":, 
                *"comment":,
            }

        */
        const body = await req.json();
        console.log(body);
        const res = await prisma.ContentReport.create({
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


