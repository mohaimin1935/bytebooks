import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async (req,{params}) => {
    const { authorId } = params;
  try {
    const authors = await prisma.author.findUnique({
            where: {
                id:authorId
            }
        });

    //return new NextResponse(JSON.stringify(authors, { status: 200 }));
    //console.log(authors);
    return NextResponse.json(authors);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
    const { bookId, chapterId } = params;
    try {
        const body = await req.json(); 

        const existingChapter = await prisma.chapter.findUnique({
            where: {
                id_bookId: {
                    id: chapterId,
                    bookId: bookId,
                },
            },
        });

        if (!existingChapter) {
            return NextResponse.json(
                { message: "Chapter not found" },
                { status: 404 }
            );
        }

    
        const updatedChapter = await prisma.chapter.update({
            where: {
                id_bookId: {
                    id: chapterId,
                    bookId: bookId,
                },
            },
            data: body,
        });

    
        return NextResponse.json(updatedChapter);
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { message: "Something went wrong", error: err.message },
            { status: 500 }
        );
    }
};


export const DELETE = async (req, { params }) => {
    const { authorId } = params;
    try {
        await prisma.bookAuthor.deleteMany({
            where: {
                authorId: authorId,
            },
        });

        const deletedAuthor = await prisma.author.delete({
            where: {
                id: authorId,
            },
        });

        return NextResponse.json(
            { message: "Author deleted successfully", author: deletedAuthor },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);

        if (err.code === 'P2025') {
            return NextResponse.json(
                { message: "Author not found" },
                { status: 404 }
            );
        } else {
            return NextResponse.json(
                { message: "Something went wrong", error: err.message },
                { status: 500 }
            );
        }
    }
};
