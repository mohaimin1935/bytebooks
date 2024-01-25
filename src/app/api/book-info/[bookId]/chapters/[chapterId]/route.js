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
    const { bookId, chapterId } = params;
    try {
        const body = await req.json(); 

       
        const existingChapter = await prisma.chapter.findUnique({
            where: {
                    id: chapterId,
                    bookId: bookId,
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
                    id: chapterId,
                    bookId: bookId,
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
    const { bookId, chapterId } = params;
    try {
        
        const existingChapter = await prisma.chapter.findUnique({
            where: {
                    id: chapterId,
                    bookId: bookId,
            },
        });

        
        if (!existingChapter) {
            return NextResponse.json(
                { message: "Chapter not found" },
                { status: 404 }
            );
        }

        
        await prisma.chapter.delete({
            where: {
                    id: chapterId,
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


