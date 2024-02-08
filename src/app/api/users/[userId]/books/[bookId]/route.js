import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A BOOKUSER ENTRY
export const POST = async (req, { params }) => {
  const { userId, bookId } = params;
  // Adjusting to the updated model fields
  const { status, chapterId, byteId, audioTimeStampChapter, audioTimeStampBytes, notes, rating } = req.body;
    
  if (!userId || !bookId || !status) {
    // Return an error response if any mandatory field is missing
    return { status: 400, body: { error: 'Missing mandatory fields' } };
  }

  try {
    // Attempt to find an existing BookUser entry
    const existingEntry = await prisma.bookUser.findUnique({
      where: {
        userId_bookId: { userId, bookId }, // Composite key
      },
    });

    let bookUser;
    if (existingEntry) {
      // Update the existing entry if it's found
      bookUser = await prisma.bookUser.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          status,
          chapterId,
          byteId,
          audioTimeStampChapter, // Updated to reflect model changes
          audioTimeStampBytes,   // Updated to reflect model changes
          notes,
          rating,
          updatedAt: new Date(), // Optionally ensure updatedAt is explicitly set
        },
      });
    } else {
      // Create a new BookUser entry if no existing entry is found
      bookUser = await prisma.bookUser.create({
        data: {
          userId,
          bookId,
          status,
          chapterId,
          byteId,
          audioTimeStampChapter, // Updated to reflect model changes
          audioTimeStampBytes,   // Updated to reflect model changes
          notes,
          rating,
        },
      });
    }

    return { status: 200, body: bookUser };
  } catch (error) {
    console.error('Request error:', error);
    return { status: 500, body: { error: 'Error creating or updating BookUser entry', errorMessage: error.message } };
  }
};
