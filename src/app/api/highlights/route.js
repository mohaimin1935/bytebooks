import { selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// create a new highlight
export const POST = async (req) => {
  const authError = await selfValidationOnlyFailed(params.userId);
  if (authError) {
    return authError;
  }
  

  try {

    const body = await req.json();

    console.log(body);
    
    const res = await prisma.Highlights.create({ data: body });
    console.log(res);

    return NextResponse.json(res);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};


