// file-status: need to work


import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

export const GET = async (req,{params}) => {
    // self validation checks both login status and userid match
    const authError = await selfValidationOnlyFailed();
    if (authError) {
        return authError;
    }
    try {
        const url = req.nextUrl;
        const searchParams = url.searchParams;

        // Initialize an empty filter object
        let filter = {};

        // Example search parameters based on your schema
        // if no type then show latest
        filter.type = "latest";
        if (searchParams.has('type')) {
            filter.type = searchParams.get('type');
        }
        //if no count then default count 20
        filter.count = 20;
        if (searchParams.has('count')) {
            filter.count = searchParams.get('count');
        }
        //if no page index default page index 0
        filter.page = 0;
        if (searchParams.has('page')) {
            filter.page = searchParams.get('page');
        }
        
        // Add more filters as needed
        console.log(filter);

        const results = await prisma.BookInfo.findMany({
            skip: filter.count*filter.page,
            take: filter.count,
            where: {
              userId: params.userId,
            },
            
        });
        console.log(results);
        return NextResponse.json(results);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

