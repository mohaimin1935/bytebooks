"use client";

import AUthorCard from "@/app/ui/author/AuthorCard";
import Loader from "@/app/ui/common/Loader";
import Selector from "@/app/ui/common/Selector";
import TextArea from "@/app/ui/common/TextArea";
import UploadImage from "@/app/ui/common/UploadImage";
import { ThemeContext } from "@/contexts/ThemeContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillAudio } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookmark,
  FiEdit3,
  FiPlus,
  FiShare2,
  FiStar,
  FiUpload,
} from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const AddBook = () => {
  const [bookImage, setBookImage] = useState("");
  const [bookTitle, setBookTitle] = useState();
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [intro, setIntro] = useState();
  const [desc, setDesc] = useState();
  const [isbn, setIsbn] = useState();
  const [publishingYear, setPublishingYear] = useState();

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState();

  const { modal, setModal } = useContext(ThemeContext);

  useEffect(() => {
    setSaved(false);
  }, [bookImage, bookTitle, authors, genres, intro, desc, isbn]);

  useEffect(() => {
    if (!modal) setShowModal();
  }, [modal]);

  const removeAuthor = (id) => {
    let temp = authors;
    temp = temp.filter((a) => a.id !== id);
    setAuthors(temp);
  };

  const addAuthor = () => {
    setModal(true);
    setShowModal("author");
  };

  const removeGenre = (id) => {};

  const addGenre = () => {
    setModal(true);
    setShowModal("genre");
  };

  const removeTag = (id) => {};

  const addTag = () => {
    setModal(true);
    setShowModal("tag");
  };

  const handleSave = () => {
    setLoading(true);

    const bookInfo = {
      isbn,
      publishingYear,
      title: bookTitle,
      image: bookImage,
      intro,
      desc,
      authorIds: authors.map((author) => author.id),
      tagIds: tags.map((tag) => tag.id),
      genreIds: genres.map((genres) => genres.id),
      // creators:
    };

    console.log(bookInfo);

    setSaved(true);
    toast.success("Saved successfully.");
  };

  return (
    <div>
      {modal && (
        <Selector
          options={authors}
          addLink={"/author/add"}
          selected={authors}
          setSelected={setAuthors}
          handleRemove={removeAuthor}
        />
      )}
      <div className="flex gap-x-16 ml-12 relative">
        {!saved ? (
          <button
            className="primary-btn rounded-md shadow hover:shadow-xl transition duration-300 py-2 px-5 absolute right-0 top-0"
            onClick={handleSave}
          >
            {!loading ? <span>Save</span> : <Loader />}
          </button>
        ) : (
          <div className="absolute right-0 top-0 flex flex-col items-end">
            <Link
              href=""
              className="flex gap-x-2 transition duration-300 items-center"
            >
              <p>Chapter Editor</p>
              <FiArrowRight />
            </Link>
            <Link
              href=""
              className="flex gap-x-2 transition duration-300 items-center"
            >
              <p>Summary Editor</p>
              <FiArrowRight />
            </Link>
            <Link
              href=""
              className="flex gap-x-2 transition duration-300 items-center"
            >
              <FiArrowLeft />
              <p>Back</p>
            </Link>
          </div>
        )}

        <div className="w-1/5 rounded-xl shadow-xl relative z-10">
          <UploadImage initialImage={""} setURL={setBookImage} />
        </div>

        <div className="w-1/2">
          {/* book title */}
          <input
            className={"font-semibold text-4xl mb-2 bg1 outline-none content2"}
            type="text"
            placeholder="Book Title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          {/* authors */}
          <p className="text-lg content2 flex items-center">
            <span className="mr-2">By</span>
            {authors.map(({ name, id }) => (
              <span
                className="px-2 py-1.5 mr-2 rounded inline-flex items-center text-sm bg2"
                key={id}
              >
                {name}
                <button className="pl-2" onClick={() => removeAuthor(id)}>
                  <IoMdClose />
                </button>
              </span>
            ))}
            <button
              className="bg2 px-2 py-1.5 mr-2 rounded inline-flex items-center"
              onClick={() => addAuthor()}
            >
              <FiPlus />
            </button>
          </p>
          {/* intro */}
          <TextArea
            value={intro}
            setValue={setIntro}
            className={""}
            maxLength={120}
            placeholder={"Intro here..."}
            maxHeight={100}
          ></TextArea>
        </div>
      </div>

      <div className="bg-pure w-full -mt-24 rounded-xl relative border-2 border-bkg-2">
        <div className="flex gap-x-16 mt-32 mx-12 mb-12">
          <div className="w-3/5">
            {/* genres */}
            <p className="font-semibold text-lg mb-4">Genres</p>
            <div className="flex items-center mb-12">
              {genres.map(({ title, id }) => (
                <span
                  className="border border-check rounded-full pl-4 py-1.5 mr-2 inline-flex items-center"
                  key={id}
                >
                  {title}
                  <button className="px-2" onClick={(id) => removeGenre(id)}>
                    <IoMdClose size={18} />
                  </button>
                </span>
              ))}
              <button
                className="px-4 py-2 border border-check rounded-full mr-2"
                onClick={addGenre}
              >
                <FiPlus size={18} />
              </button>
            </div>

            {/* tags */}
            <p className="font-semibold text-lg mb-4">Tags</p>
            <div className="flex items-center mb-12">
              {tags.map(({ title, id }) => (
                <span
                  className="border border-check rounded-full pl-4 py-1.5 mr-2 inline-flex items-center"
                  key={id}
                >
                  {title}
                  <button className="px-2" onClick={(id) => removeTag(id)}>
                    <IoMdClose size={18} />
                  </button>
                </span>
              ))}
              <button
                className="px-4 py-2 border border-check rounded-full mr-2"
                onClick={addTag}
              >
                <FiPlus size={18} />
              </button>
            </div>

            {/* desc */}
            <p className="font-semibold text-lg mb-4">Description</p>
            <TextArea
              className={"text-justify"}
              placeholder={"Description here..."}
              maxLength={800}
              value={desc}
              setValue={setDesc}
              maxHeight={1000}
            ></TextArea>
          </div>
          <div className="w-2/5">
            <p className="font-semibold text-lg mb-4">About the Authors</p>
            <AUthorCard author={""} editable={true} />

            {/* isbn */}
            <p className="font-semibold text-lg mb-4 mt-12">ISBN</p>
            <input
              className={"mb-2 bg-transparent outline-none content2"}
              type="text"
              placeholder="978-1-4028-9462-6"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />

            {/* publishing year */}
            <p className="font-semibold text-lg mb-4 mt-12">Publishing Year</p>
            <input
              className={"mb-2 bg-transparent outline-none content2"}
              type="text"
              placeholder="2013"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
