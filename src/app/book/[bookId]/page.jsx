"use client";

import AuthorCard from "@/app/ui/author/AuthorCard";
import Link from "next/link";
import React from "react";
import { AiFillAudio } from "react-icons/ai";
import { FiBookmark, FiPlus, FiShare2, FiStar } from "react-icons/fi";
import { IoHeadset } from "react-icons/io5";

const ViewBook = () => {
  return (
    <div className="mx-auto max-w-5xl min-h-screen center relative">
      <div className="flex gap-x-16 ml-12 w-full px-6">
        <div className="w-1/5 rounded-xl shadow-xl z-10">
          <div
            className="pb-[133%] rounded-md"
            style={{
              backgroundImage: `url(${"/bookImage.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <div className="w-1/2">
          <h3 className="font-semibold text-4xl mb-2">Book Name</h3>
          <p className="text-lg content2">By Author</p>

          <div className="flex gap-x-4 mt-3 content2">
            <div className="flex gap-x-2 items-center">
              <FiStar size={18} />
              <p className="">4.7</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <IoHeadset size={18} />
              <p className="">22 min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-pure w-full -mt-24 rounded-xl relative border-2 border-bkg-2">
        <div className="absolute right-8 -top-28 flex flex-col items-end gap-y-2">
          <Link
            href={``}
            className="border primary-btn px-4 py-1.5 rounded w-36 text-center text-sm"
          >
            View Bytes
          </Link>
          <Link
            href={``}
            className="border secondary-btn px-4 py-1.5 rounded w-36 text-sm text-center"
          >
            View Chapters
          </Link>
        </div>

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
            <p className="font-semibold text-lg mb-4">
              What&apos;s this about?
            </p>
            <div className="flex items-center mb-12">
              <span className="px-4 py-1.5 border border-check rounded-full mr-2">
                Genre1
              </span>
              <span className="px-4 py-1.5 border border-check rounded-full mr-2">
                Genre2
              </span>
              <span className="px-4 py-1.5 border border-check rounded-full mr-2">
                Genre3
              </span>
            </div>

            <p className="font-semibold text-lg mb-4">Description</p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              officiis nesciunt maiores numquam recusandae distinctio fugiat,
              corrupti soluta adipisci tempora id fugit, aspernatur, eos
              obcaecati aliquid veniam odio. Nemo nobis omnis amet quaerat
              harum, unde eveniet in quas laudantium ad dolor eum exercitationem
              consequuntur earum eos cum pariatur alias vero!
            </p>
          </div>
          <div className="w-2/5">
            <p className="font-semibold text-lg mb-4">About the Author</p>
            <AuthorCard author={{ name: "Test", desc: "Desc" }} />

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
