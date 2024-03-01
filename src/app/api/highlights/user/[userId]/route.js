import { selfValidationOnlyFailed } from "@/middleware/authorization";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// get user hightlights
// need to add filters
export const GET = async (req, {params}) => {
  const authError = await selfValidationOnlyFailed(params.userId);
  if (authError) {
    return authError;
  }
  
  try {

    const res = await prisma.Highlights.findMany({
        where: {
            userId: params.userId,
        },
        // select: {
        //     id: true,
        //     bookId: true,
        //     chapterId: true,
        //     byteId: true,
        //     startIndex: true,
        //     endIndex: true,
        //     book: true,
        // },
        include: {
            book: { include: {
                authors: { include: {
                    author: true,
                }
                }
            }},
            chapter: true,
            byte: true,
        }
    });
    console.log(res);
    let r = [];
    for (let i=0;i<res.length;i++) {
        let o = {};
        o.id = res[i].id;
        o.timestamp = res[i].updatedAt;
        o.title = res[i].book.title;
        o.bookId = res[i].bookId;
        o.chapterId = res[i].chapterId;
        o.byteId = res[i].byteId;
        o.startIndex = res[i].startIndex;
        o.endIndex = res[i].endIndex;
        let content="";
        if (res[i].chapter) {
            content = res[i].chapter.content.substr(o.startIndex,o.endIndex);
        }
        else if (res[i].byte) {
            content = res[i].byte.content.substr(o.startIndex,o.endIndex);
        }
        o.content = content;
        let a = [];
        for (let j=0;j<res[i].book.authors.length;j++) {
            a.push(res[i].book.authors[j].author.name);
            //console.log(res[i].book.authors[j].name);
        }
        o.authors = a;
        // need to add contect #check
        r.push(o);
    }
    console.log(r);
    return NextResponse.json(r);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};


