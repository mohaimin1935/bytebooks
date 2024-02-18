import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import validateMandatoryFields from "@/middleware/mandatoryFieldList";

export const GET = async (req, { params }) => {
  try {
    const url = req.nextUrl;
    const searchParams = url.searchParams;

    let filter = {};

    // Check if a search string is provided for the book title
    if (searchParams.has("searchString")) {
      const searchString = searchParams.get("searchString");

      // Adjust the filter to search for books with titles containing the searchString
      filter.title = {
        contains: searchString,
        mode: "insensitive", // This ensures the search is case-insensitive
      };
    }

    // Add more filters as needed, based on your application's requirements

    let books = await prisma.bookInfo.findMany({
      where: filter,
      include: {
        authors: { include: { author: true } },
        genres: { include: { genre: true } },
        // Include other relations as needed
      },
    });

    return NextResponse.json(books);
  } catch (err) {
    console.error("Error: ", err.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
