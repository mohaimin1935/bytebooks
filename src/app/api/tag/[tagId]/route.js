import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async (req,{params}) => {
    const { tagId } = params;
  try {
    const tags = await prisma.tag.findUnique({
            where: {
                id:tagId
            }
        });

    //return new NextResponse(JSON.stringify(authors, { status: 200 }));
    //console.log(authors);
    return NextResponse.json(tags);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
    const { tagId } = params;
    try {
        const body = await req.json(); 
        
        
        const updatedTag = await prisma.tag.update({
            where: {
                id: tagId,
            },
            data: body, 
        });

        return NextResponse.json(updatedTag);
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { message: "Something went wrong", error: err.message },
            { status: 500 }
        );
    }
};

export const DELETE = async (req, { params }) => {
    const { tagId } = params;
    try {
        await prisma.bookTag.deleteMany({
            where: {
                tagId: tagId,
            },
        });

        const deletedTag = await prisma.tag.delete({
            where: {
                id: tagId,
            },
        });

        return NextResponse.json(
            { message: "Tag deleted successfully", tag: deletedTag },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);

        if (err.code === 'P2025') {
            return NextResponse.json(
                { message: "tag not found" },
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
