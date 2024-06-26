// file-status: done

import {
  creatorOnlyFailed,
  selfValidationOnlyFailed,
} from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields from "@/middleware/mandatoryFieldList";
import bcrypt from "bcrypt";

export const POST = async (req, { params }) => {
  // self validation checks both login status and userid match
  const authError = await selfValidationOnlyFailed(params.userId);
  if (authError) {
    return authError;
  }
  
  const passwordMatch1 = await bcrypt.compare(
    "12345678",
    "$2b$10$xd5ntDahqclgGe9joVzFVuVMN34/jRwNU22DiJCKeTXAJm.8DDb9."
  );
  if (passwordMatch1) console.log("matched");
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
      },
    });
    if (!user) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
        );
    }
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
      console.log("new:"+newHashedPassword);
      return NextResponse.json(
        { message: "success" },
        { status: 200 } //check response code
      );
    } else {
      //
      return NextResponse.json({ message: "mismatch" }, { status: 500 });
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
