import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { userId, notificationId } = params; // Assuming you're passing notificationId as a param
  
  try {
    const body = await req.json(); // Parse the request body for the fields to update

    // Optionally, check if the notification belongs to the userId
    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: userId,
      },
    });

    if (!existingNotification) {
      return NextResponse.json({ message: "Notification not found or does not belong to the user." }, { status: 404 });
    }

    // Update the notification with the parsed fields
    const updatedNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: body,
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
};
