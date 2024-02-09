// file-status: need to work

import { selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields from "@/middleware/mandatoryFieldList";

export const GET = async (req, { params }) => {
  // self validation checks both login status and userid match
  // const authError = await selfValidationOnlyFailed(params.userId);
  // if (authError) {
  //   return authError;
  // }
  try {
    const url = req.nextUrl;
    const searchParams = url.searchParams;

    // Initialize an empty filter object
    let filter = {};

    // Example search parameters based on your schema
    // if no type then show latest
    filter.type = "latest";
    if (searchParams.has("type")) {
      filter.type = searchParams.get("type");
    }
    //if no count then default count 20
    filter.count = 20;
    if (searchParams.has("count")) {
      filter.count = parseInt(searchParams.get("count"), 10);
    }
    //if no page index default page index 0
    filter.page = 0;
    if (searchParams.has("page")) {
      filter.page = parseInt(searchParams.get("page"), 10);
    }

    // Add more filters as needed
    console.log(filter);

    //need to fix logic #check
    let results = [];
    if (filter.type === "latest") {
    } else if (filter.type === "continue") {
    } else if (filter.type === "trending") {
    } else if (filter.type === "recommended") {
    }
    results = await prisma.BookUser.findMany({
      skip: filter.count * filter.page,
      take: filter.count,
      // where: {
      //   userId: params.userId,
      // },
      // include: {
      //     book: true,
      // }
    });
    console.log(results);
    let res = [];
    for (let i = 0; i < results.length; i++) {
      res.push(results[i].bookId);
    }
    console.log(res);
    let books = await prisma.bookInfo.findMany({
      where: {
        // id: {
        //   in: res,
        // },
      },
      include: {
        authors: { include: { author: true } },
        genres: { include: { genre: true } },
        // Include other relations as needed
      },
    });
    return NextResponse.json(books);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
