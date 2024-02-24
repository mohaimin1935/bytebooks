import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//streak update and login record creation
export const POST = async (req, { params }) => {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    console.log(today.getDate(), now.getDate());

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    console.log(today, yesterday);

    // Check if a login record already exists for today
    const todayLogin = await prisma.userLogin.findFirst({
      where: {
        userId: userId,
        loginDate: today,
      },
    });

    // If not, create a new login record for today
    if (!todayLogin) {
      await prisma.userLogin.create({
        data: {
          userId: userId,
          loginDate: today,
        },
      });
    }

    let newStreak = user.loginStreak;
    const lastLoginDate = user.lastLoginDate
      ? new Date(user.lastLoginDate)
      : null;

    if (lastLoginDate) {
      const lastLoginDay = new Date(
        lastLoginDate.getFullYear(),
        lastLoginDate.getMonth(),
        lastLoginDate.getDate()
      );
      if (lastLoginDay.getTime() === yesterday.getTime()) {
        newStreak++;
      } else if (lastLoginDay.getTime() < yesterday.getTime()) {
        newStreak = 1;
      }
      // If user already logged in today, newStreak remains unchanged
    } else {
      newStreak = 1; // First login
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { lastLoginDate: today, loginStreak: newStreak },
    });

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Request error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        errorMessage: error.message,
      }),
      { status: 500 }
    );
  }
};

//sreak number and login dates retrieval
export const GET = async (req, { params }) => {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const loginStreak = user.loginStreak;
    const loginDates = await prisma.userLogin.findMany({
      where: { userId: userId },
      orderBy: { loginDate: "desc" },
      select: { loginDate: true },
    });

    const formattedLoginDates = loginDates.map(
      (ld) => ld.loginDate.toISOString().split("T")[0]
    );

    return new NextResponse(
      JSON.stringify({
        streak: loginStreak,
        loginDates: formattedLoginDates,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Request error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        errorMessage: error.message,
      }),
      { status: 500 }
    );
  }
};
