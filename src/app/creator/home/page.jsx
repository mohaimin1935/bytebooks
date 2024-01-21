"use client";

import UploadImage from "@/app/ui/common/UploadImage";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";

// indigo emerald amber
const CreatorHome = () => {
  const [addStatus, setAddStatus] = useState();

  const { modal } = useContext(ThemeContext);

  return (
    <div className="flex gap-12 relative">
      {modal && (
        <div className="absolute z-50 inset-0 m-auto w-1/2">
          <AddBook />
        </div>
      )}

      {/* TODO */}
      <div className="w-1/3 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-indigo-500"></div>
        <h3 className="text-xl font-semibold text-center my-4">TODO</h3>
        <AddButton status="todo" setAddStatus={setAddStatus} />
      </div>

      {/* IN PROGRESS */}
      <div className="w-1/3 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-amber-500"></div>
        <h3 className="text-xl font-semibold text-center my-4">IN PROGRESS</h3>
        <AddButton status="inProgress" setAddStatus={setAddStatus} />
      </div>

      {/* PUBLISHED */}
      <div className="w-1/3 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-emerald-500"></div>
        <h3 className="text-xl font-semibold text-center my-4">PUBLISHED</h3>
      </div>
    </div>
  );
};

const AddButton = ({ status, setAddStatus }) => {
  const { modal, setModal } = useContext(ThemeContext);

  const handleClick = () => {
    setModal((modal) => !modal);
    setAddStatus(status);
  };

  return (
    <div
      className="border border-check center cursor-pointer py-2 rounded-full mt-8 m-4 text-xl"
      onClick={handleClick}
    >
      <IoMdAdd />
    </div>
  );
};

const AddBook = () => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isbn, setIsbn] = useState();

  const { setModal } = useContext(ThemeContext);

  const handleOK = async () => {
    const book = {
      title,
      author,
      imageUrl,
      isbn,
    };

    try {
      const response = await axios.post("/api/book-info", book);

      console.log(response);
    } catch (error) {
    } finally {
      setModal(false);
    }
  };

  return (
    <div className="bg2 rounded-xl p-8 flex gap-x-8">
      <div className="w-1/2 relative">
        <UploadImage setURL={setImageUrl} />
      </div>
      <div className="w-1/2 flex flex-col justify-between">
        <div className="flex flex-col gap-y-6">
          <input
            type="text"
            className="px-1 bg2 py-1 outline-none content2 border-b border-check text-sm w-64"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="px-1 bg2 py-1 outline-none content2 border-b border-check text-sm w-64"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            className="px-1 bg2 py-1 outline-none content2 border-b border-check text-sm w-64"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>

        <button
          className="primary-btn py-2 rounded-lg w-24 ml-auto"
          onClick={handleOK}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CreatorHome;
