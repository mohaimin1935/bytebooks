"use client";

import AddAuthor from "@/app/ui/author/AddAuthor";
import Loader from "@/app/ui/common/Loader";
import Modal from "@/app/ui/common/Modal";
import Selector from "@/app/ui/common/Selector";
import TextArea from "@/app/ui/common/TextArea";
import UploadFile from "@/app/ui/common/UploadFile";
import { ThemeContext } from "@/contexts/ThemeContext";
import { fetcher } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiArrowRight, FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoCloudDoneOutline } from "react-icons/io5";
import useSWR, { useSWRConfig } from "swr";

const AddBook = ({ bookInfo }) => {
  const { mutate } = useSWRConfig();

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

  const [book, setBook] = useState(bookInfo);

  const [bookImage, setBookImage] = useState();
  const [bookTitle, setBookTitle] = useState();
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState();
  const [isbn, setIsbn] = useState();
  const [publishingYear, setPublishingYear] = useState();

  const [bookId, setBookId] = useState("");

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionProgressing, setActionProgressing] = useState(false);

  const [showModal, setShowModal] = useState();

  const router = useRouter();
  const { modal, setModal } = useContext(ThemeContext);

  useEffect(() => {
    setModal(false);
    setShowModal("");
  }, []);

  useEffect(() => {
    if (book) {
      console.log(book);
      setBookTitle(book.title);
      setBookImage(book.image);
      setAuthors(book.authors?.map((a) => a.author) || []);
      setGenres(book.genres?.map((a) => a.genre) || []);
      setTags(book.tags?.map((a) => a.tag) || []);
      setDesc(book.desc);
      setIsbn(book.isbn);
      setPublishingYear(book.publishingYear);

      setBookId(book.id);
    }
  }, [book]);

  useEffect(() => {
    if (!modal) setShowModal();
  }, [modal]);

  useEffect(() => {
    setSaved(false);
  }, [book, bookImage, authors, genres, tags, desc, isbn, publishingYear]);

  useEffect(() => {
    if (saved && !modal && !actionProgressing && !book) {
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

  const handleSaveAction = (action) => {
    if (!saved) handleSave();

    setActionProgressing(true);
    setModal(false);

    if (action === "back") router.push("home");
    else if (action === "chapter")
      router.push(`/book/${bookId}/content-editor?type=chapter`);
    else if (action === "byte")
      router.push(`/book/${bookId}/content-editor?type=byte`);
  };

  const handleSave = async () => {
    if (loading) return;

    const bookInfo = {
      isbn,
      publishingYear: parseInt(publishingYear),
      title: bookTitle,
      image: bookImage,
      desc,
      authorIds: authors?.map((author) => author.id) || [],
      tagIds: tags?.map((tag) => tag.id) || [],
      genreIds: genres?.map((genres) => genres.id) || [],
      creatorIds: [userId],
    };

    try {
      setLoading(true);

      if (book) {
        const res = await axios.patch(`/api/book-info/${bookId}`, bookInfo);
        // setBook(res.data);
      } else {
        const res = await axios.post("/api/book-info", bookInfo);
        console.log(res.data);
        // setBook(res.data);
        setBookId(res.data.id);
      }
      mutate(`/api/book-info/${bookId}`);
      setSaved(true);
      // setModal(true);
      router.refresh();
      // setShowModal("save-action");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

      {/* {showModal === "save-action" && (
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
              <button
                onClick={() => handleSaveAction("back")}
                className="flex items-center gap-x-1"
              >
                <FiArrowLeft className="inline" />{" "}
                <span className="">Back</span>
              </button>
              <div className="flex gap-x-4">
                <button
                  onClick={() => handleSaveAction("chapter")}
                  className="secondary-btn py-1 rounded"
                >
                  Add Chapter
                </button>
                <button
                  onClick={() => handleSaveAction("byte")}
                  className="primary-btn py-1 rounded"
                >
                  Add Byte
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )} */}

      <div className="flex gap-x-16 ml-12 relative">
        {(!saved || book) && (
          <button
            className="primary-btn rounded-md shadow hover:shadow-xl transition duration-300 py-2 px-5 absolute right-0 top-0"
            onClick={handleSave}
          >
            {!loading ? <span>Save</span> : <Loader />}
          </button>
        )}
        {book && (
          <div className="absolute right-0 top-20 flex flex-col items-end gap-y-1">
            <button
              onClick={() => handleSaveAction("byte")}
              className="flex items-center gap-x-2"
            >
              <span>Byte Editor</span>
              <FiArrowRight />
            </button>
            <button
              onClick={() => handleSaveAction("chapter")}
              className="flex items-center gap-x-2"
            >
              <span>Chapter Editor</span>
              <FiArrowRight />
            </button>
          </div>
        )}

        <div className="w-1/5 rounded-md relative z-10">
          <UploadFile
            setURL={setBookImage}
            initialImage={book?.image || ""}
            previousUrl={book?.image}
            recommendedSize={"4:3"}
          />
        </div>

        <div className="w-1/2 mb-4">
          {/* book title */}
          <input
            className={"font-semibold text-3xl mb-2 bg1 outline-none content2"}
            type="text"
            placeholder="Book Title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          {/* authors */}
          <p className="text-sm content2 flex items-center flex-wrap gap-y-1">
            <span className="mr-2">By</span>
            {authors?.map(({ name, id }) => (
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
        </div>
      </div>

      <div className="bg-pure w-full -mt-24 rounded-xl relative border-2 border-bkg-2">
        <div className="flex gap-x-16 mt-32 mx-12 mb-12">
          <div className="w-3/5">
            {/* genres */}
            <p className="font-semibold text-lg mb-4">Genres</p>
            <div className="flex flex-wrap items-center mb-12 gap-y-2">
              {genres?.map(({ name, id }) => (
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
            <div className="flex items-center mb-12 flex-wrap gap-y-2">
              {tags?.map(({ name, id }) => (
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
              type="number"
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
