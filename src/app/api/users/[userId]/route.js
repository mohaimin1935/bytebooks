// don't change without notifying @zulkar

import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// need to add authentication check and other error codes
export const GET = async (req,{params}) => {
    //console.log(params.userId);
  try {
    const user = await prisma.User.findUnique({
        where: {
            id: params.userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,     // need to add country and xp
        }
    });
    //console.log(user)
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// need to add authentication check and other error codes
export const PUT = async (req,{params}) => {
    //console.log(params.userId);
  try {
    const body = await req.json();
    const user = await prisma.User.update({
        where: {
            id: params.userId,
        },
        data: {
            name: body.name,
            email: body.email,
            image: body.image,
            role: body.role,    // need to add country and xp
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,     // need to add country and xp
        }
    });
    console.log(user)
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
