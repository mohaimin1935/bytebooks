import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


// export const GET = async (req,{params}) => {
//     const { genreId } = params;
//   try {
//     const genres = await prisma.genre.findUnique({
//             where: {
//                 id:genreId
//             }
//         });

//     //return new NextResponse(JSON.stringify(authors, { status: 200 }));
//     //console.log(authors);
//     return NextResponse.json(genres);
//   } catch (err) {
//     console.log(err);

//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// };

export const GET = async (req, { params }) => {
  const { bookId, chapterId } = params;
  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        bookId: bookId, 
      }
    });
    //const chapter = await prisma.chapter.findMany();

    if (!chapter) {
      
      return NextResponse.json(
        { message: "Chapter not found" },
        { status: 404 }
      );
    }

    
    return NextResponse.json(chapter);
  } catch (err) {
    console.error(err);

    
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};



export const PATCH = async (req, { params }) => {
    const { genreId } = params;
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
                {  status: 409 }
            );
        }
        
        const updatedGenre = await prisma.genre.update({
            where: {
                id: genreId,
            },
            data: body, 
        });

        return NextResponse.json(updatedGenre);
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { message: "Something went wrong", error: err.message },
            { status: 500 }
        );
    }
};

export const DELETE = async (req, { params }) => {
    const { genreId } = params;
    try {
        await prisma.bookGenre.deleteMany({
            where: {
                genreId: genreId,
            },
        });

        const deletedGenre = await prisma.genre.delete({
            where: {
                id: genreId,
            },
        });

        return NextResponse.json(
            { message: "Genre deleted successfully", genre: deletedGenre },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);

        if (err.code === 'P2025') {
            return NextResponse.json(
                { message: "genre not found" },
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
