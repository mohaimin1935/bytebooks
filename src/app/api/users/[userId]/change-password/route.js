// don't change without notifying @zulkar

import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

// need to add authentication check, mismatch check and other error codes
// fix mismatch check
export const POST = async (req,{params}) => {
    console.log("testing");
    console.log(params.userId);
  try {
    const body = await req.json();
    console.log(body.old_password);
    const user = await prisma.User.findUnique({
        where: {
            id: params.userId,
        },
        select: {
            id: true,
            hashedPassword: true,
        }
    });
    if (user.hashedPassword===body.old_password) {
        const updateUser = await prisma.User.update({
            where: {
                id: params.userId,
            },
            data: {
                hashedPassword: body.new_password,
            },
        });
        console.log(updateUser);
        return NextResponse.json(
            {message: "success"},
            {status: 200}
        );
    }
    else {          //
        return NextResponse.json(
            { message: "mismatch" },
            { status: 500 }
        );
    }
    //return NextResponse.json(user);
  } catch (err) {
    console.log(err);

    

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

