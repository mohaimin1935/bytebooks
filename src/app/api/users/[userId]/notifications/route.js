import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    console.log(params);
  const { userId } = params;
  

  try {
    // Fetch all notifications for the specified userId
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc', // Assuming you want the newest notifications first
      },
    });

    if (notifications) {
    //   return {
    //     status: 200, // OK status
    //     body: notifications,
    //   };
    return NextResponse.json(notifications, { status: 200 });
    } else {
    //   return {
    //     status: 404, // Not Found status
    //     body: { message: "No notifications found for this user." },
    //   };
    return NextResponse.json({ message: "No notifications found for this user." }, { status: 404 });
    }
  } catch (error) {
    console.error(error); // Log the error
    // return {
    //   status: 500, // Internal Server Error status
    //   body: { message: "Something went wrong", error: error.message },
    // };
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
};