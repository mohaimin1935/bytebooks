import prisma from "@/utils/connect";
import { NextResponse } from "next/server";



export const GET = async (req, { params }) => {
  const { bookId, byteId } = params;
  try {
    const byte = await prisma.byte.findFirst({
      where: {
        id: byteId,
        bookId: bookId, 
      }
    });
    //const chapter = await prisma.chapter.findMany();

    if (!byte) {
      
      return NextResponse.json(
        { message: "Chapter not found" },
        { status: 404 }
      );
    }

    
    return NextResponse.json(byte);
  } catch (err) {
    console.error(err);

    
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};



export const PATCH = async (req, { params }) => {
    const { bookId, byteId } = params;
    try {
        const body = await req.json(); 

       
        const existingByte = await prisma.byte.findUnique({
            where: {
                    id: byteId,
                    bookId: bookId,
            },
        });

        
        if (!existingByte) {
            return NextResponse.json(
                { message: "Chapter not found" },
                { status: 404 }
            );
        }

        
        const updatedByte = await prisma.byte.update({
            where: {
                    id: byteId,
                    bookId: bookId,
            },
            data: body,
        });

        
        return NextResponse.json(updatedByte);
    } catch (err) {
        console.error(err);

        
        return NextResponse.json(
            { message: "Something went wrong", error: err.message },
            { status: 500 }
        );
    }
};


export const DELETE = async (req, { params }) => {
    const { bookId, byteId } = params;
    try {
        
        const existingByte = await prisma.byte.findUnique({
            where: {
                    id: byteId,
                    bookId: bookId,
            },
        });

        
        if (!existingByte) {
            return NextResponse.json(
                { message: "Chapter not found" },
                { status: 404 }
            );
        }

        
        await prisma.byte.delete({
            where: {
                    id: byteId,
                    bookId: bookId,
            },
        });

        
        return NextResponse.json(
            { message: "Chapter deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);

        
        return NextResponse.json(
            { message: "Something went wrong", error: err.message },
            { status: 500 }
        );
    }
};


