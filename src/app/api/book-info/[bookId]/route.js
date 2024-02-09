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
        tags: {
          include: {
            tag: true,
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

export const PUT = async (req, { params }) => {
  const { bookId } = params;

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


  try {
    const updatedBook = await prisma.bookInfo.update({
      where: {
        id: bookId,
      },
      data: body,
    });

     if (body.isPublished === true) {
      // Fetch all users
      const users = await prisma.user.findMany({
        select: { id: true }, // Select only the user IDs as that's what we need
      });

      // Create a notification for each user
      const notifications = users.map(user => ({
        userId: user.id,
        title: "New Book Published",
        message: `A new book "${updatedBook.title}" has been published. Check it out!`,
        type: "new_book",
        bookId: updatedBook.id,
      }));

      // Use Prisma to create many notifications in one operation
      await prisma.notification.createMany({
        data: notifications,
        //skipDuplicates: true, // Optional: skip if there's already a similar notification
      });
    }

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
};

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

    //author filtering
    //console.log(body);
    const existingBookAuthors = await prisma.bookAuthor.findMany({
      where: {
        bookId: bookId,
      },
    });
    const existingAuthorIds = existingBookAuthors.map(
      (connection) => connection.authorId
    );
    const newAuthors = body.authorIds.filter(
      (authorId) => !existingAuthorIds.includes(authorId)
    );
    const deletedAuthors = existingAuthorIds.filter(
      (authorId) => !body.authorIds.includes(authorId)
    );

    //genre and tag filtering
    const existingBookTags = await prisma.bookTag.findMany({
      where: {
        bookId: bookId,
      },
    });
    const existingTagIds = existingBookTags.map(
      (connection) => connection.tagId
    );
    const newTags = body.tagIds.filter(
      (tagId) => !existingTagIds.includes(tagId)
    );
    const deletedTags = existingTagIds.filter(
      (tagId) => !body.tagIds.includes(tagId)
    );

    const existingBookGenres = await prisma.bookGenre.findMany({
      where: {
        bookId: bookId,
      },
    });
    const existingGenreIds = existingBookGenres.map(
      (connection) => connection.genreId
    );
    const newGenres = body.genreIds.filter(
      (genreId) => !existingGenreIds.includes(genreId)
    );
    const deletedGenres = existingGenreIds.filter(
      (genreId) => !body.genreIds.includes(genreId)
    );

    const existingCreators = await prisma.bookCreator.findMany({
      where: {
        bookId: bookId,
      },
    });
    const existingCreatorIds = existingCreators.map(
      (connection) => connection.creatorId
    );
    const newCreators = body.creatorIds.filter(
      (creatorId) => !existingCreatorIds.includes(creatorId)
    );
    const deletedCreators = existingCreatorIds.filter(
      (creatorId) => !body.creatorIds.includes(creatorId)
    );

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

          create: newAuthors?.map((authorId) => ({ authorId })),
          deleteMany: deletedAuthors?.map((authorId) => ({ authorId })),
        },
        tags: {
          // TODO: check if the author is already there
          create: newTags?.map((tagId) => ({ tagId })),
          deleteMany: deletedTags?.map((tagId) => ({ tagId })),
        },
        // TODO: check if the author is already there
        genres: {
          create: newGenres?.map((genreId) => ({ genreId })),
          deleteMany: deletedGenres?.map((genreId) => ({ genreId })),
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
