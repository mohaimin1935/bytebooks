import AuthorCard from "@/app/ui/author/AuthorCard";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { AiFillAudio } from "react-icons/ai";
import { FiArrowRight, FiBookmark, FiShare2, FiStar } from "react-icons/fi";

const getData = async (bookId) => {
  console.log("ok");
  try {
    const res = await axios.get(`${baseApi}/book-info/${bookId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const ViewBook = async ({ params }) => {
  const { bookId } = params;
  const book = await getData(bookId);

  console.log(book);

  return (
    <div>
      <div className="flex gap-x-16 ml-12 relative">
        <div className="absolute right-0 top-0 gap-y-4 flex flex-col items-end">
          <Link
            href=""
            className="flex gap-x-2 transition duration-300 items-center primary-btn py-1.5 px-6 text-sm"
          >
            <p>Summary</p>
            <FiArrowRight />
          </Link>
          <Link
            href=""
            className="flex gap-x-2 transition duration-300 items-center secondary-btn py-1.5 px-6 text-sm"
          >
            <p>Full Book</p>
            <FiArrowRight />
          </Link>
        </div>
      </div>

      <div className="flex gap-x-16 ml-12">
        <div className="w-1/5 rounded-xl shadow-xl z-10">
          <div
            className="pb-[133%] rounded-xl"
            style={{
              backgroundImage: `url(${book.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <div className="w-1/2">
          <h3 className="font-semibold text-4xl mb-2">{book.title}</h3>
          <p className="text-lg content2">
            By{" "}
            {book.authors.map(({ author }) => (
              <p key={author.id} className="mr-2 bg2 px-2 py-1 rounded">
                {author.name}
              </p>
            ))}
          </p>

          <div className="flex gap-x-4 mt-2">
            <div className="flex gap-x-2 items-center">
              <FiStar size={18} />
              <p className="">4.7</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <AiFillAudio size={18} />
              <p className="">22 min</p>
            </div>
          </div>

          <p className="content2 my-4 w-3/4">{book.intro}</p>
        </div>
      </div>

      <div className="bg-pure w-full -mt-24 rounded-xl relative border-2 border-bkg-2">
        <div className="absolute top-6 right-8 flex gap-4">
          <button className="bg2 rounded-full p-4">
            <FiBookmark />
          </button>
          <button className="bg2 rounded-full p-4">
            <FiShare2 />
          </button>
        </div>

        <div className="flex gap-x-16 mt-32 mx-12 mb-12">
          <div className="w-3/5">
            <p className="font-semibold text-lg mb-4">Genres</p>
            <div className="flex items-center mb-12">
              {
                // TODO: update genre link
                book.genres.map(({ genre }) => (
                  <Link
                    key={genre.id}
                    href="/"
                    className="px-4 py-1.5 border border-check rounded-full mr-2"
                  >
                    {genre.name}
                  </Link>
                ))
              }
            </div>

            <p className="font-semibold text-lg mb-4">Description</p>
            <p className="text-justify">{book.desc}</p>
          </div>
          <div className="w-2/5">
            <p className="font-semibold text-lg mb-4">About the Author</p>
            {book.authors.map(({ author }) => (
              <AuthorCard key={author.id} author={author} />
            ))}

            <p className="font-semibold text-lg mb-4 mt-12">
              Available Languages
            </p>
            <ul className="list-disc ml-8">
              <li>English</li>
              <li>বাংলা</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
