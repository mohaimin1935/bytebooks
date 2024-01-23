import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async (req,{params}) => {
    const { authorId } = params;
  try {
    const authors = await prisma.author.findUnique({
            where: {
                id:authorId
            }
        });

    //return new NextResponse(JSON.stringify(authors, { status: 200 }));
    console.log(authors);
    return NextResponse.json(authors);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};