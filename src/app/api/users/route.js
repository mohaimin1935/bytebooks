// file-status: need to work

import {
    adminOnlyFailed,
    authenticatedOnlyFailed,
    creatorOnlyFailed,
    selfValidationOnlyFailed,
  } from "@/middleware/authorization";
  import prisma from "@/utils/connect";
  import { NextResponse } from "next/server";
  import validateMandatoryFields from "@/middleware/mandatoryFieldList";
  
  // need to add error check and different filter options
  export const GET = async (req, { params }) => {
    // const authError = await adminOnlyFailed();
    // if (authError) {
    //   return authError;
    // }
    try {
      const users = await prisma.User.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true, // need to add country and xp
          appliedToBeCreator: true,
        },
      });
      console.log(users);
      return NextResponse.json(users);

    } catch (err) {
      console.log(err);
  
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  };
  
//   export const PATCH = async (req, { params }) => {
//     // self validation checks both login status and userid match
//     console.log(params);
//     const authError = await selfValidationOnlyFailed(params.userId);
//     if (authError) {
//       return authError;
//     }
//     try {
//       const body = await req.json();
  
//       if (body.email) {
//         // TODO: match password and update email
//       } else if (body.password) {
//         // TODO: match oldpassword and update password
//       } else {
//         const user = await prisma.User.update({
//           where: {
//             id: params.userId,
//           },
//           data: body,
//         });
//         console.log(user);
//         return NextResponse.json(user);
//       }
//     } catch (err) {
//       console.log(err);
  
//       return NextResponse.json(
//         { message: "Something went wrong" },
//         { status: 500 }
//       );
//     }
//   };
  
//   export const DELETE = async (req, { params }) => {
//     // self validation checks both login status and userid match
//     const authError = await selfValidationOnlyFailed();
//     if (authError) {
//       return authError;
//     }
//     try {
//       const user = await prisma.User.delete({
//         where: {
//           id: params.userId,
//         },
//       });
//       return NextResponse.json(
//         { message: "success" },
//         { status: 200 } //check status code
//       );
//     } catch (err) {
//       console.log(err);
  
//       return NextResponse.json(
//         { message: "Something went wrong" },
//         { status: 500 }
//       );
//     }
//   };
  