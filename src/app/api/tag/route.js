import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A TAG
export const POST = async (req) => {
  // const authError = await creatorOnlyFailed();
  // if (authError) {
  //   return authError;
  // }


  try {
    const body = await req.json();

    const existingTag = await prisma.tag.findUnique({
      where: {
        name: body.name,
      },
    });

    
    if (existingTag) {
      return NextResponse.json(
        { message: "Tag with this name already exists" },
        { status: 409 }
      );
    }
    
    const newTag = await prisma.tag.create({ data: body });

    return new NextResponse(JSON.stringify(newTag, { status: 201 }));
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// GET TAG LIST
export const GET = async (req) => {
  try {
    const tags = await prisma.tag.findMany();

    return new NextResponse(JSON.stringify(tags, { status: 200 }));
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
