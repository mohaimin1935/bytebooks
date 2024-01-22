"use client";

import React from "react";
import { AiFillAudio } from "react-icons/ai";
import { FiBookmark, FiPlus, FiShare2, FiStar } from "react-icons/fi";

const AddBook = () => {
  return (
    <div>
      <div className="flex gap-x-16 ml-12">
        <div className="w-1/5 rounded-xl shadow-xl z-10">
          <div
            className="pb-[133%]"
            style={{
              backgroundImage: `url(${"imageURL"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <div className="w-1/2">
          <h3 className="font-semibold text-4xl mb-2">Book Name</h3>
          <p className="text-lg content2">By Author</p>

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

          <p className="content2 my-4 w-3/4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
            consequuntur natus at cum distinctio, neque quod assumenda nobis
            sint explicabo.
          </p>
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
            <p className="font-semibold text-lg mb-4">What's this about?</p>
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
              <button className="px-4 py-2 border border-check rounded-full mr-2">
                <FiPlus size={18} />
              </button>
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
            <p className="">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
              maxime tempora beatae harum accusamus nesciunt quasi ut ducimus
              labore ab officiis in, error dolor corporis!
            </p>

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

export default AddBook;
