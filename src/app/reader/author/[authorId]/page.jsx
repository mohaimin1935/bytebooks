import BookFlip from "@/app/ui/book/cards/BookFlip";
import Search from "@/app/ui/common/Search";
import { baseApi } from "@/utils/util";
import axios from "axios";
import React from "react";

const getData = async () => {
  try {
    const res = await axios.get(`${baseApi}/`)
  } catch (error) {
    console.log(error)
  }
}

const ViewAuthor = () => {
  return (
    <div>
      {/* banner */}
      <div className="h-72 accent1 rounded-xl shadow relative">
        <div className="absolute top-0 right-20 pt-12 p-4 rounded-b-full bg2">
          <img src="/author.png" alt="" className="w-40 h-40 rounded-full" />
        </div>

        <div className="absolute top-16 left-20">
          <h3 className="text-2xl font-semibold mb-1">Author Name</h3>
          <p className="">36 Books</p>
        </div>
      </div>
      {/* books */}
      <h2 className="section-header mt-16 mb-4">Books by Author</h2>
      <Search placeholder={"Search by title"} />
      <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8 mt-8">
        <BookFlip width={140} details={true} audio={false} />
        <BookFlip width={140} details={true} audio={false} />
        <BookFlip width={140} details={true} audio={false} />
      </div>
    </div>
  );
};

export default ViewAuthor;
