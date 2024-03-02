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
  
  //need to check error condition
  export const POST = async (req,{params}) => {
      const authError = await creatorOnlyFailed();
      if (authError) {
          return authError;
      }
  
    try {
        const body = await req.json();
      const res = await prisma.BookInfo.findUnique({
          where: {
              id: body.book1Id,
          },
      });
      const res1 = await prisma.BookInfo.findUnique({
        where: {
            id: body.book2Id,
        },
    });
    if (body.book1Id===body.book2Id || (body.book2Id!=="null" && (res?.alternateBookId!==null || res1?.alternateBookId!==null))) {
        return NextResponse.json({ message: "Relation exists with these books" },
        { status: 403 });
    }
    if (body.book2Id=== "null") {
        const r = await prisma.BookInfo.findUnique({
            where: {
                id: body.book1Id,
            },
        });
        if (r.alternateBookId!==null) {
            const r1 = await prisma.BookInfo.update({
            where: {
                id: r.alternateBookId,
            },
            data: {
                alternateBookId: null,
            },
        });
        }
        const r2 = await prisma.BookInfo.update({
            where: {
                id: body.book1Id,
            },
            data: {
                alternateBookId: null,
            },
        });
    }
    else {
        const r = await prisma.BookInfo.update({
            where: {
                id: body.book1Id,
            },
            data: {
                alternateBookId: body.book2Id,
            },
        });
        const r1 = await prisma.BookInfo.update({
            where: {
                id: body.book2Id,
            },
            data: {
                alternateBookId: body.book1Id,
            },
        });
    }
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
  
//   // need to check error condition
//   export const POST = async (req, { params }) => {
//     const authError = await adminOnlyFailed();
//     if (authError) {
//       return authError;
//     }
  
//     try {
//       /*
//               example request body, optional fields are marked with *
//               {
//                   "userId":,
//                   "bookId":,
//                   *"chapterId":,
//                   *"byteId":, 
//                   *"comment":,
//               }
  
//           */
//       const body = await req.json();
//       if (!body.comment) {
//         body.comment = "Contact with an admin";
//       }
//       let status = false;
//       if (body.status === "suspend") {
//         status = true;
//       } else if (body.status === "unsuspend") {
//         status = false;
//       }
//       const res = await prisma.BookInfo.update({
//         where: {
//           id: params.bookId,
//         },
//         data: {
//           isSuspended: status,
//           isPublished: false,
//         },
//         include: {
//           creators: {
//             include: {
//               creator: true,
//             },
//           },
//         },
//       });
  
//       console.log(res);
//       // const reporter = await prisma.ContentReport.findMany({
//       //     where: {
//       //         id: params.reportId,
//       //     },
//       //     select: {
//       //         userId: true,
//       //     }
//       // });
//       let creators = [];
//       for (let i = 0; i < res.creators.length; i++) {
//         let b = {};
//         b.userId = res.creators[i].creator.id;
//         creators.push(b);
//       }
//       if (status === true) {
//         // Create a notification for each user
//         //   const notifications = reporter.map(user => ({
//         //     userId: user.userId,
//         //     title: "Report Reviewed",
//         //     message: `"${res.title}" has been suspended`,
//         //     type: "report",
//         //     bookId: res.id,
//         //   }));
  
//         //   // Use Prisma to create many notifications in one operation
//         //   await prisma.notification.createMany({
//         //     data: notifications,
//         //     //skipDuplicates: true, // Optional: skip if there's already a similar notification
//         //   });
//         const notifications1 = creators.map((user) => ({
//           userId: user.userId,
//           title: "Book Suspended",
//           message: `Your book "${res.title}" has been suspended.\nComment: ${body.comment}`,
//           type: "book_suspend_status_changed",
//           bookId: res.id,
//         }));
  
//         // Use Prisma to create many notifications in one operation
//         await prisma.notification.createMany({
//           data: notifications1,
//           //skipDuplicates: true, // Optional: skip if there's already a similar notification
//         });
//       } else if (status === false) {
//         const notifications1 = creators.map((user) => ({
//           userId: user.userId,
//           title: "Book Unsuspended",
//           message: `Your book "${res.title}" has been unsuspended`,
//           type: "book_suspend_status_changed",
//           bookId: res.id,
//         }));
  
//         // Use Prisma to create many notifications in one operation
//         await prisma.notification.createMany({
//           data: notifications1,
//           //skipDuplicates: true, // Optional: skip if there's already a similar notification
//         });
//       }
  
//       // const users = await prisma.user.findMany({
//       //     select: { id: true }, // Select only the user IDs as that's what we need
//       //   });
  
//       //   // Create a notification for each user
//       //   const notifications = users.map(user => ({
//       //     userId: user.id,
//       //     title: "New Book Published",
//       //     message: `A new book "${updatedBook.title}" has been published. Check it out!`,
//       //     type: "new_book",
//       //     bookId: updatedBook.id,
//       //   }));
  
//       //   // Use Prisma to create many notifications in one operation
//       //   await prisma.notification.createMany({
//       //     data: notifications,
//       //     //skipDuplicates: true, // Optional: skip if there's already a similar notification
//       //   });
//       // }
//       return NextResponse.json({ isSuspended: status }, { status: 200 });
//     } catch (err) {
//       console.log(err);
  
//       return NextResponse.json(
//         { message: "Something went wrong" },
//         { status: 500 }
//       );
//     }
//   };
  