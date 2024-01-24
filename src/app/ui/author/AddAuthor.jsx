"use client";

import Loader from "@/app/ui/common/Loader";
import TextArea from "@/app/ui/common/TextArea";
import UploadImage from "@/app/ui/common/UploadImage";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import React from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const AddAuthor = ({ setAuthors = () => {}, setShowModal = () => {} }) => {
  const [imageURL, setImageURL] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  const handleAdd = async () => {
    if (loading) return;

    const newAuthor = {
      name,
      desc,
      image: imageURL,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/author", newAuthor);
      setAuthors((prev) => [...prev, res.data]);
      toast.success("Success");
      setShowModal("");
      setModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="bg1 w-md z-50 absolute top-0 bottom-0 left-0 right-0 m-auto max-w-lg h-[560px] rounded-lg shadow-xl p-8 pt-12 overflow-auto"
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0.0 }}
      >
        <div
          className="absolute right-4 top-4 cursor-pointer p-2"
          onClick={() => setModal(false)}
        >
          <IoMdClose size={24} />
        </div>
        <div className="w-full h-full mt-4">
          <div className="flex items-center w-full gap-x-12">
            <div className="w-1/5 rounded shadow border-check relative z-10">
              <UploadImage setURL={setImageURL} className={"accent2"} />
            </div>

            <div className="w-3/5">
              <input
                className={"font-semibold text-xl bg1 outline-none content2"}
                type="text"
                placeholder="Author name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autofocus
              />
            </div>
          </div>

          <TextArea
            className={"text-justify mt-12"}
            placeholder={"Description here..."}
            maxLength={400}
            value={desc}
            setValue={setDesc}
            maxHeight={300}
          ></TextArea>

          <div className="center mt-16">
            <button className="primary-btn px-6 py-1.5" onClick={handleAdd}>
              {!loading ? <span>Add Author</span> : <Loader />}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddAuthor;
