import { authenticatedOnlyFailed, creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from "next/server";

// search by author name and book title
export const POST = async (req) => {
  const authError = await authenticatedOnlyFailed();
  if (authError) {
    return authError;
  }


  try {
    const body = await req.json();

    const books = await prisma.BookInfo.findMany({
        where: {
          title: {
            contains: body.query, // Check if the fieldName contains the substring
            mode: Prisma.QueryMode.insensitive
          }
        },
        include: {
            authors: {
                include: {
                    author: true,
                }
            }
        }
      });

      const authors = await prisma.Author.findMany({
        where: {
          name: {
            contains: body.query, // Check if the fieldName contains the substring
            mode: Prisma.QueryMode.insensitive
          }
        }
      });
    
      let res = {};
      res.books = books;
      res.authors = authors;
      console.log(res);


    return new NextResponse(res);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

