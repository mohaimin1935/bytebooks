import { creatorOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A GENRE
export const POST = async (req) => {
  // const authError = await creatorOnlyFailed();
  // if (authError) {
  //   return authError;
  // }
  

  try {

    const body = await req.json();

    const existingGenre = await prisma.genre.findUnique({
      where: {
        name: body.name,
      },
    });

    
    if (existingGenre) {
      return NextResponse.json(
        { message: "Genre with this name already exists" },
        { status: 409 }
      );
    }


    
    const newGenre = await prisma.genre.create({ data: body });

    return new NextResponse(JSON.stringify(newGenre, { status: 201 }));
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// GET GENRE LIST
export const GET = async (req) => {
  try {
    const genres = await prisma.genre.findMany();

    return new NextResponse(JSON.stringify(genres, { status: 200 }));
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
