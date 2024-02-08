import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A BOOKUSER ENTRY
export const POST = async (req, { params }) => {
  const { userId, bookId } = params;


  // Adjusting to the updated model fields
  const body = await req.json(); 
  const { status, chapterId, byteId, audioTimeStampChapter, audioTimeStampBytes, notes, rating } = body;
  console.log(userId, bookId, status, chapterId, byteId, audioTimeStampChapter, audioTimeStampBytes, notes, rating);
  if (!userId || !bookId || !status) {
    
    
    return new NextResponse(JSON.stringify({ error: 'Missing mandatory fields' }), { status: 400 });
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

    return new NextResponse(JSON.stringify(bookUser), { status: 200 });
  } catch (error) {
    console.error('Request error:', error);
    // Ensure an error response is returned
    return new NextResponse(JSON.stringify({ error: 'Error creating or updating BookUser entry', errorMessage: error.message }), { status: 500 });
  }
};


