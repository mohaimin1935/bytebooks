import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A BOOK INFO
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not authenticated" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const bookInfo = await prisma.post.create({})

    return new NextResponse(JSON.stringify(body, { status: 201 }));
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
