// file-status: need to work


import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields  from "@/middleware/mandatoryFieldList";

export const POST = async (req,{params}) => {
    // self validation checks both login status and userid match
    const authError = await selfValidationOnlyFailed();
    if (authError) {
        return authError;
    }
    try {
        const body = await req.json();
        //console.log(body.old_password);
        const user = await prisma.User.findUnique({
            where: {
                id: params.userId,
            },
            select: {
                id: true,
                hashedPassword: true,
            }
        });
        const passwordMatch = await bcrypt.compare(
            body.old_password,
            user.hashedPassword
          );
        if (passwordMatch) {
            const newHashedPassword = await bcrypt.hash(body.new_password, 10);
            const updateUser = await prisma.User.update({
                where: {
                    id: params.userId,
                },
                data: {
                    hashedPassword: newHashedPassword,
                },
            });
            console.log(updateUser);
            return NextResponse.json(
                {message: "success"},
                {status: 200}               //check response code
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

