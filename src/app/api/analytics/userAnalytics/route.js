import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Current date and time
    const now = new Date();
    // 24 hours ago (to define active users)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Total number of users
    const totalUsers = await prisma.user.count();

    // Total number of active users in the last 24 hours
    const activeUserIds = await prisma.userLogin.findMany({
      where: {
        loginDate: {
          gte: oneDayAgo,
        },
      },
      select: {
        userId: true, // Select only userId to ensure uniqueness
      },
      distinct: ["userId"], // Ensuring each userId is only counted once
    });

    const activeUsers = activeUserIds.length;
    // Total number of new sign-ups (assuming 'createdAt' field in User model is used to track sign-ups)
    const newSignUps = await prisma.user.count({
      where: {
        createdAt: {
          gte: oneDayAgo,
        },
      },
    });

    // Preparing the response object
    const response = {
      totalUsers,
      activeUsers,
      newSignUps,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error: ", err.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
