import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { bookId } = params;

  //console.log("test", bookId);
  try {
    const book = await prisma.bookInfo.findUnique({
      where: {
        id: bookId,
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    //console.log(book);
    return NextResponse.json(book);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// TODO: PATCH
// TODO: DELETE

export const PATCH = async (req, { params }) => {
  const { bookId } = params;
  try {
    const body = await req.json(); // Parse the request body

    // Check if the book exists
    const existingBook = await prisma.bookInfo.findUnique({
      where: {
        id: bookId,
      },
    });

    // If the book does not exist, return a 404 status with a message
    if (!existingBook) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Update the book with the new data
    const updatedBook = await prisma.bookInfo.update({
      where: {
        id: bookId,
      },
      data: {
        isbn: body.isbn,
        publishingYear: body.publishingYear,
        title: body.title,
        image: body.image,
        intro: body.intro,
        desc: body.desc,
        authors: {
          // TODO: check if the author is already there
          create: body.authorIds?.map((authorId) => ({ authorId })),
        },
        tags: {
          // TODO: check if the author is already there
          create: body.tagIds?.map((tagId) => ({ tagId })),
        },
        // TODO: check if the author is already there
        genres: {
          create: body.genreIds?.map((genreId) => ({ genreId })),
        },
        creators: {
          // TODO: check if the author is already there
          create: body.creatorIds?.map((creatorId) => ({ creatorId })),
        },
      },
    });

    // Return the updated book
    return NextResponse.json(updatedBook);
  } catch (err) {
    console.error(err);

    // In case of any server-side error, return a 500 status with a generic error message
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { bookId } = params;
  try {
    // Check if the book exists
    const existingBook = await prisma.bookInfo.findUnique({
      where: {
        id: bookId,
      },
    });

    // If the book does not exist, return a 404 status with a message
    if (!existingBook) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    await prisma.bookCreator.deleteMany({
      where: { bookId: bookId },
    });

    await prisma.bookGenre.deleteMany({
      where: { bookId: bookId },
    });

    // await prisma.bookChapter.deleteMany({
    //     where: { bookId: bookId }
    // });

    await prisma.bookAuthor.deleteMany({
      where: { bookId: bookId },
    });

    await prisma.bookTag.deleteMany({
      where: { bookId: bookId },
    });

    // Delete the book
    await prisma.bookInfo.delete({
      where: {
        id: bookId,
      },
    });

    // Return a success message
    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    // In case of any server-side error, return a 500 status with a generic error message
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
};
