"use client";

import Loader from "@/app/ui/common/Loader";
import TextArea from "@/app/ui/common/TextArea";
import UploadImage from "@/app/ui/common/UploadImage";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import React from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Modal from "../common/Modal";

const AddAuthor = ({
  author,
  setAuthors = () => {},
  setShowModal = () => {},
}) => {
  const [imageURL, setImageURL] = useState(author?.image);
  const [name, setName] = useState(author?.name);
  const [desc, setDesc] = useState(author?.desc);

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  const handleCancel = () => {
    setModal(false);
  };

  const handleAdd = async () => {
    if (loading) return;

    const newAuthor = {
      name,
      desc,
      image: imageURL,
    };

    try {
      setLoading(true);
      if (!author) {
        const res = await axios.post("/api/author", newAuthor);
        setAuthors((prev) => [...prev, res.data]);
      } else {
        const res = await axios.patch(`/api/author/${author.id}`, newAuthor);
        setAuthors((prev) =>
          prev.map((item) => (item.id === author.id ? { ...res.data } : item))
        );
      }
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Request failed.");
    } finally {
      setShowModal("");
      setModal(false);
      setLoading(false);
    }
  };

  return (
    <Modal className={"h-[420px]"}>
      <div
        className="absolute right-4 top-4 cursor-pointer p-2"
        onClick={() => setModal(false)}
      >
        <IoMdClose size={24} />
      </div>
      <div className="w-full h-full mt-4 pb-8">
        <div className="flex items-center w-full gap-x-12">
          <div className="w-1/5 rounded shadow border-check relative z-10">
            <UploadImage
              setURL={setImageURL}
              initialImage={imageURL}
              className={"accent2"}
            />
          </div>

          <div className="w-3/5">
            <input
              className={"font-semibold text-xl bg1 outline-none content2"}
              type="text"
              placeholder="Author name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <TextArea
          className={"text-justify mt-12"}
          placeholder={"Description here..."}
          maxLength={400}
          value={desc}
          setValue={setDesc}
          maxHeight={200}
        ></TextArea>

        <div className="my-12 flex items-center justify-between">
          <button
            className="border border-check px-4 py-1.5 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="accent1 w-24 py-2 rounded" onClick={handleAdd}>
            {!loading ? <p>Add</p> : <Loader />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddAuthor;
