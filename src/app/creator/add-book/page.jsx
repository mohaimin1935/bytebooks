"use client";

import AddAuthor from "@/app/ui/author/AddAuthor";
import Loader from "@/app/ui/common/Loader";
import Modal from "@/app/ui/common/Modal";
import Selector from "@/app/ui/common/Selector";
import TextArea from "@/app/ui/common/TextArea";
import UploadImage from "@/app/ui/common/UploadImage";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiArrowRight, FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoCloudDoneOutline } from "react-icons/io5";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const AddBook = () => {
  const { data: authorList, isLoading: authorLoading } = useSWR(
    "/api/author",
    fetcher
  );
  const { data: tagList, isLoading: tagLoading } = useSWR("/api/tag", fetcher);
  const { data: genreList, isLoading: genreLoading } = useSWR(
    "/api/genre",
    fetcher
  );

  const { data } = useSession();
  const userId = data?.user.id;

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

  const router = useRouter();
  const { modal, setModal } = useContext(ThemeContext);

  useEffect(() => {
    if (!modal) setShowModal();
  }, [modal]);

  useEffect(() => {
    if (saved && !modal) {
      router?.push("/creator/home");
    }
  }, [saved, modal, router]);

  const removeAuthor = (id) => {
    let temp = authors;
    temp = temp.filter((a) => a.id !== id);
    setAuthors(temp);
  };

  const addAuthor = () => {
    setModal(true);
    setShowModal("author");
  };

  const removeGenre = (id) => {
    console.log("genre remove:", id);
    let temp = genres;
    temp = temp.filter((a) => a.id !== id);
    setGenres(temp);
  };

  const addGenre = () => {
    setModal(true);
    setShowModal("genre");
  };

  const removeTag = (id) => {
    let temp = tags;
    temp = temp.filter((a) => a.id !== id);
    setTags(temp);
  };

  const addTag = () => {
    setModal(true);
    setShowModal("tag");
  };

  const handleSave = async () => {
    if (loading) return;

    const bookInfo = {
      isbn,
      publishingYear: parseInt(publishingYear),
      title: bookTitle,
      image: bookImage,
      intro,
      desc,
      authorIds: authors.map((author) => author.id),
      tagIds: tags.map((tag) => tag.id),
      genreIds: genres.map((genres) => genres.id),
      creatorIds: [userId],
    };

    try {
      setLoading(true);

      const res = await axios.post("/api/book-info", bookInfo);
      console.log(res.data);
      setSaved(true);
      toast.success("Saved successfully.");
      setModal(true);
      setShowModal("save-action");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(showModal, modal);

  return (
    <div>
      {showModal === "author" && (
        <Selector
          options={authorList}
          addLink={"/author/add"}
          selected={authors}
          setSelected={setAuthors}
          handleRemove={removeAuthor}
          defaultImage={"/author.png"}
          hasImage={true}
          isLoading={authorLoading}
          setShowModal={setShowModal}
          modalType="add-author"
        />
      )}

      {showModal === "add-author" && (
        <div className="">
          <AddAuthor setAuthors={setAuthors} setShowModal={setShowModal} />
        </div>
      )}

      {showModal === "tag" && (
        <Selector
          options={tagList}
          selected={tags}
          setSelected={setTags}
          handleRemove={removeTag}
          hasImage={false}
          creatable
          createApi="/api/tag"
          isLoading={tagLoading}
        />
      )}

      {showModal === "genre" && (
        <Selector
          options={genreList}
          selected={genres}
          setSelected={setGenres}
          handleRemove={removeGenre}
          hasImage={false}
          creatable
          createApi="/api/genre"
          isLoading={genreLoading}
        />
      )}

      {showModal === "save-action" && (
        <Modal className={"h-[180px]"}>
          <div className="">
            <div className="flex items-center gap-x-2">
              <IoCloudDoneOutline
                size={24}
                className="text-emerald-500 inline"
              />
              Saved Successfully. What do you want to do next?
            </div>
            <div className="flex mt-8 items-center justify-between gap-x-4">
              <Link href="/" className="flex items-center gap-x-1">
                {" "}
                <FiArrowLeft className="inline" />{" "}
                <span className="">Back</span>
              </Link>
              <div className="flex gap-x-4">
                <Link className="secondary-btn py-1 rounded" href="/">
                  Add Chapter
                </Link>
                <Link className="primary-btn py-1 rounded" href="/">
                  Add Byte
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex gap-x-16 ml-12 relative">
        {!saved && (
          <button
            className="primary-btn rounded-md shadow hover:shadow-xl transition duration-300 py-2 px-5 absolute right-0 top-0"
            onClick={handleSave}
          >
            {!loading ? <span>Save</span> : <Loader />}
          </button>
        )}

        <div className="w-1/5 rounded-xl shadow-xl relative z-10">
          <UploadImage setURL={setBookImage} />
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
            maxLength={80}
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
            <div className="flex flex-wrap items-center mb-12 ">
              {genres.map(({ name, id }) => (
                <span
                  className="border border-check rounded-full pl-4 py-1.5 mr-2 inline-flex items-center capitalize"
                  key={id}
                >
                  {name}
                  <button className="px-2" onClick={() => removeGenre(id)}>
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
            {/* tags */}
            <p className="font-semibold text-lg mb-4">Tags</p>
            <div className="flex items-center mb-12">
              {tags.map(({ name, id }) => (
                <span
                  className="border border-check rounded-full pl-4 py-1.5 mr-2 inline-flex items-center"
                  key={id}
                >
                  {name}
                  <button className="px-2" onClick={() => removeTag(id)}>
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
