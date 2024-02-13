// file-status: done

import {
    creatorOnlyFailed,
    selfValidationOnlyFailed,
  } from "@/middleware/authorization";
  import prisma from "@/utils/connect";
  import { NextResponse } from "next/server";
  import validateMandatoryFields from "@/middleware/mandatoryFieldList";
  import bcrypt from "bcrypt";

  let expireHours = 24;

  export const GET = async (req, { params }) => {
    // no validation needed
    // const authError = await selfValidationOnlyFailed(params.userId);
    // if (authError) {
    //   return authError;
    // }
    
    // const passwordMatch1 = await bcrypt.compare(
    //   "12345678",
    //   "$2b$10$xd5ntDahqclgGe9joVzFVuVMN34/jRwNU22DiJCKeTXAJm.8DDb9."
    // );
    // if (passwordMatch1) console.log("matched");

    try {
        // token gets invalidated after 24 hours
        
        const timeComp = new Date((new Date()).getTime() - (expireHours * 60 * 60 * 1000)); // Subtracting  t hours from current time

        console.log(timeComp);
      //const body = await req.json();
      //console.log(body.old_password);
      const res = await prisma.ResetPasswordRequest.findUnique({
        where: {
          tokenValue: params.tokenValue,
          updatedAt: {
            gte: timeComp,
          },
        },
      });
      console.log(res);
      if (!res) {
        const r = await prisma.ResetPasswordRequest.deleteMany({
            where: {
                tokenValue: params.tokenValue,
            },
        });
          return NextResponse.json(

              { message: "Invalid request token" },
              { status: 200 }
          );
      }
      
        // const newHashedPassword = await bcrypt.hash(body.newPassword, 10);
        // const updateUser = await prisma.User.update({
        //     where: {
        //         id: res.userId,
        //     },
        //     data: {
        //         hashedPassword: newHashedPassword,
        //     },
        // });
        // console.log(updateUser);
        // console.log("new:"+newHashedPassword);
        // const r = await prisma.ResetPasswordRequest.delete({
        //     where: {
        //         id: res.id,
        //     },
        // });

        return NextResponse.json(
            { message: "success" },
            { status: 200 } //check response code
        );
        
      //return NextResponse.json(user);
    } catch (err) {
      console.log(err);
  
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  };
  
  export const POST = async (req, { params }) => {
    // no validation needed
    // const authError = await selfValidationOnlyFailed(params.userId);
    // if (authError) {
    //   return authError;
    // }
    
    // const passwordMatch1 = await bcrypt.compare(
    //   "12345678",
    //   "$2b$10$xd5ntDahqclgGe9joVzFVuVMN34/jRwNU22DiJCKeTXAJm.8DDb9."
    // );
    // if (passwordMatch1) console.log("matched");
    
    //console.log("api");
    try {
        // token gets invalidated after 24 hours
        
        const timeComp = new Date((new Date()).getTime() - (expireHours * 60 * 60 * 1000)); // Subtracting  t hours from current time

        console.log(timeComp);
      const body = await req.json();
      //console.log(body);
      // check if valid password
      if (body?.newPassword?.length<6) {
        return NextResponse.json(
          { message: "Something went wrong" },
          { status: 500 }
        );
      }
      //console.log(body.old_password);
      const res = await prisma.ResetPasswordRequest.findUnique({
        where: {
          tokenValue: params.tokenValue,
          updatedAt: {
            gte: timeComp,
          },
        },
      });
      console.log(res);
      if (!res) {
        const r = await prisma.ResetPasswordRequest.deleteMany({
            where: {
                tokenValue: params.tokenValue,
            },
        });
          //console.log("api");
          return NextResponse.json(
              { message: "Invalid request token" },
              { status: 200 }       // check error code
          );
      }
      
        const newHashedPassword = await bcrypt.hash(body.newPassword, 10);
        const updateUser = await prisma.User.update({
            where: {
                id: res.userId,
            },
            data: {
                hashedPassword: newHashedPassword,
            },
        });
        console.log(updateUser);
        console.log("new:"+newHashedPassword);
        const r = await prisma.ResetPasswordRequest.delete({
            where: {
                id: res.id,
            },
        });

        return NextResponse.json(
            { message: "success" },
            { status: 200 } //check response code
        );
        
      //return NextResponse.json(user);
    } catch (err) {
      console.log(err);
  
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  };
  