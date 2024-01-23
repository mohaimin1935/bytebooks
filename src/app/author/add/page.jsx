"use client";

import Loader from "@/app/ui/common/Loader";
import TextArea from "@/app/ui/common/TextArea";
import UploadImage from "@/app/ui/common/UploadImage";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import React from "react";
import toast from "react-hot-toast";

const AddAuthor = () => {
  const [imageURL, setImageURL] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    setModal(false);
  }, []);

  const handleAdd = async () => {
    if (loading) return;

    const newAuthor = {
      name,
      desc,
      image: imageURL,
    };

    try {
      setLoading(true);
      await axios.post("/api/author", newAuthor);
      toast.success("Success");
      router.back();
    } catch (error) {
      console.log(error);
      toast.error("Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center h-screen bg1">
      <div className="w-[600px] h-[520px] overflow-auto rounded-xl shadow p-8 bg2">
        <div className="flex items-center w-full gap-x-12">
          <div className="w-1/5 rounded-xl shadow border-check relative z-10">
            <UploadImage setURL={setImageURL} className={"accent2"} />
          </div>

          <div className="w-3/5">
            <input
              className={"font-semibold text-xl bg2 outline-none content2"}
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
    </div>
  );
};

export default AddAuthor;
