// file-status: need to work


import { authenticatedOnlyFailed, creatorOnlyFailed, selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

export const GET = async (req,{params}) => {
  const authError = await authenticatedOnlyFailed();
  if (authError) {
    return authError;
  }
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
    if (user) {
      return NextResponse.json(user);
    }
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    );
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// need to add mandatory field check aka bad request
export const PUT = async (req,{params}) => {
  // self validation checks both login status and userid match
  const authError = await selfValidationOnlyFailed();
  if (authError) {
    return authError;
  }
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


export const DELETE = async (req,{params}) => {
  // self validation checks both login status and userid match
  const authError = await selfValidationOnlyFailed();
  if (authError) {
    return authError;
  }
  try {
    const user = await prisma.User.delete({
        where: {
            id: params.userId,
        },
    });
    return NextResponse.json(
        {message: "success"},
        {status: 200}           //check status code
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
