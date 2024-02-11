"use client";

import AuthorCard from "@/app/ui/author/AuthorCard";
import Loader from "@/app/ui/common/Loader";
import Modal from "@/app/ui/common/Modal";
import CustomTextArea from "@/app/ui/common/TextArea";
import { ThemeContext } from "@/contexts/ThemeContext";
import { baseApi, fetcher } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillAudio } from "react-icons/ai";
import { FiArrowRight, FiBookmark, FiShare2, FiStar } from "react-icons/fi";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { LuBookMarked } from "react-icons/lu";
import { TbMessageReport } from "react-icons/tb";
import useSWR from "swr";

const ViewBook = () => {
  const { bookId } = useParams();
  const { data: book } = useSWR(`/api/book-info/${bookId}`, fetcher);
  const { data: user } = useSession();
  const { data: bookUser, isLoading } = useSWR(
    `/api/users/${user?.user?.id}/books/${bookId}`,
    fetcher
  );

  const [reportText, setReportText] = useState();
  const [showModal, setShowModal] = useState();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  useEffect(() => {
    if (bookUser) {
      setIsBookmarked(bookUser?.isBookmarked);
    }
  }, [isLoading]);

  const handleReport = () => {
    setModal(true);
    setShowModal("report");
  };

  const handleBookMark = async () => {
    try {
      const res = await axios.post(
        `/api/users/${user?.user?.id}/books/${bookId}`,
        {
          isBookmarked: !isBookmarked,
          status: "will read",
        }
      );
      setIsBookmarked(!isBookmarked);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {};

  const handleCancel = () => {
    setModal(false);
    setShowModal("");
  };

  const saveReport = async () => {
    try {
      setReportLoading(true);
      // TODO: await axios.post
      toast.success("Reported successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setReportLoading(false);
    }
  };

  if (book)
    return (
      <div>
        {showModal === "report" && (
          <Modal className={"h-96"}>
            <CustomTextArea
              maxLength={400}
              maxHeight={400}
              placeholder={"Details..."}
              value={reportText}
              setValue={setReportText}
            />
            <div className="flex items-center justify-between mt-24">
              <button
                className="secondary-btn py-1 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="primary-btn py-1 rounded" onClick={saveReport}>
                {reportLoading ? <Loader /> : <>Report</>}
              </button>
            </div>
          </Modal>
        )}

        <div className="flex gap-x-16 ml-12 relative">
          <div className="absolute right-0 top-0 gap-y-4 flex flex-col items-end">
            <Link
              href={`/book/${bookId}/content?type=byte`}
              className="flex gap-x-2 transition duration-300 items-center primary-btn py-1.5 w-36 justify-center text-sm"
            >
              <p>Byte</p>
              <FiArrowRight />
            </Link>
            <Link
              href={`/book/${bookId}/content?type=chapter`}
              className="flex gap-x-2 transition duration-300 items-center secondary-btn py-1.5 text-sm w-36 justify-center"
            >
              <p>Full Book</p>
              <FiArrowRight />
            </Link>
          </div>
        </div>

        <div className="flex gap-x-16 ml-12">
          <div className="w-1/5 rounded-xl shadow-xl z-10">
            <div
              className="pb-[133%] rounded-xl bg2"
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
            <p className="text-lg content2 h-16 overflow-hidden">
              By{" "}
              {book.authors?.map(({ author }) => (
                <span key={author.id} className="mr-2">
                  {author.name}
                </span>
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
            <button onClick={handleBookMark} className="bg2 rounded-full p-4">
              {isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
            </button>
            {/* <button className="bg2 rounded-full p-4">
              <FiShare2 />
            </button> */}
            <button className="bg2 rounded-full p-4" onClick={handleReport}>
              <TbMessageReport />
            </button>
          </div>

          <div className="flex gap-x-16 mt-32 mx-12 mb-12">
            <div className="w-3/5">
              <p className="font-semibold text-lg mb-4">Genres</p>
              <div className="flex flex-wrap items-center mb-12 gap-2">
                {
                  // TODO: update genre link
                  book.genres?.map(({ genre }) => (
                    <Link
                      key={genre.id}
                      href="/"
                      className="px-4 py-1.5 border border-check rounded-full"
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
              {book.authors?.map(({ author }) => (
                <AuthorCard key={author.id} author={author} />
              ))}

              {/* <p className="font-semibold text-lg mb-4 mt-12">
                Available Languages
              </p>
              <ul className="list-disc ml-8">
                <li>English</li>
                <li>বাংলা</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ViewBook;
