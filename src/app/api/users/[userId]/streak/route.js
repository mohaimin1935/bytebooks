import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate()-1);

    let newStreak = user.loginStreak;
    const lastLoginDate = user.lastLoginDate ? new Date(user.lastLoginDate) : null;

    if (lastLoginDate) {
      const lastLoginDay = new Date(lastLoginDate.getFullYear(), lastLoginDate.getMonth(), lastLoginDate.getDate());
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
    console.error('Request error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error', errorMessage: error.message }), { status: 500 });
  }
};
