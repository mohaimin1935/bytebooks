import { creatorOnlyFailed } from "@/middleware/authorization";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE AN AUTHOR
export const POST = async (req) => {
  const authError = await creatorOnlyFailed();
  if (authError) {
    return authError;
  }

  try {
    const body = await req.json();
    // const newAuthor = await prisma.Author.create({})

    return new NextResponse(JSON.stringify(body, { status: 201 }));
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// GET AUTHOR LIST
export const GET = async (req) => {
  try {
    // const newAuthor = await prisma.Author.create({})

    return new NextResponse(JSON.stringify({}, { status: 200 }));
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
