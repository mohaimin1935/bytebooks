// file-status: done

import {
    creatorOnlyFailed,
    selfValidationOnlyFailed,
  } from "@/middleware/authorization";
  import prisma from "@/utils/connect";
  import { NextResponse } from "next/server";
  import validateMandatoryFields from "@/middleware/mandatoryFieldList";
  import bcrypt from "bcrypt";
  import { validateEmail } from "@/utils/util";
  import nodemailer from 'nodemailer';


    
  export const POST = async (req, { params }) => {
    // no validation needed
    // const authError = await selfValidationOnlyFailed(params.userId);
    // if (authError) {
    //   return authError;
    // }

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: '',
    //       pass: '',
    //     },
    //   });

    console.log("reset");
    try {
        const body = await req.json();
        if (!validateEmail(body.email)) {
            return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
            );
        }
        const res = await prisma.User.findUnique({
            where: {
                email: body.email,
            },
        });
        console.log(res);
        if (!res) {
            // email not found
            return NextResponse.json(
                { message: "not registered" },
                { status: 200 }       // check error code
            );
        }
      
        const r = await prisma.ResetPasswordRequest.deleteMany({
            where: {
                userId: res.id,
            },
        });
        // make token
        let token = await bcrypt.hash(res.email+res.id, 13);
        token = encodeURIComponent(token);
        //console.log(token);
        const result = await prisma.ResetPasswordRequest.create({
            data: {
                userId: res.id,
                tokenValue: token,
            }
        });
        //send email

            // const mailOptions = {
            //   from: '',
            //   to: '',
            //   subject: 'Test',
            //   html: '<p> this is a test</p>',
            // };
        
            // const info = await transporter.sendMail(mailOptions);
            // console.log('Email sent:', info.response);
        
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
  