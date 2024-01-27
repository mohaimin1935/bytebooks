"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import Loader from "@/app/ui/common/Loader";
import "react-quill/dist/quill.snow.css";
import UploadFile from "../common/UploadFile";
import { LuFileAudio } from "react-icons/lu";
import axios from "axios";

const ContentEditor = ({
  content,
  title,
  setTitle,
  bookId,
  type,
  activeId,
}) => {
  const [body, setBody] = useState(content?.content || "");
  const [audioUrl, setAudioUrl] = useState(content?.url);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      handleSave();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const editedContent = {
        title,
        content: body,
        audioLink: audioUrl,
      };
      console.log(content);
      const res = await axios.patch(
        `/api/book-info/${bookId}/${type}s/${activeId}`,
        editedContent
      );
      console.log(res.data);
      toast.success("Saved successfully");
    } catch (error) {
      toast.error("Could not save");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between  mb-8">
        <input
          className={
            "font-semibold text-2xl pb-2 bg1 outline-none content2 inline-block w-full capitalize"
          }
          type="text"
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="flex items-center gap-x-2">
          <LuFileAudio size={24} />
          <UploadFile
            setURL={setAudioUrl}
            aspectRatio={3}
            className="w-32 border-2 border-check"
            type="audio"
            showImage={audioUrl}
          />
        </div>
      </div>

      <div className="prose-xl w-full min-h-48">
        <Suspense fallback={() => <>Loading</>}>
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            placeholder="Tell a story..."
            className="w-full pb-16"
            modules={{
              toolbar: [
                [
                  "bold",
                  "italic",
                  "underline",
                  "blockquote",
                  "link",
                  { header: 1 },
                  { list: "bullet" },
                  { align: [] },
                  "image",
                  "video",
                ],
              ],
            }}
          />
        </Suspense>
      </div>

      <button
        className="primary-btn py-2 px-6 rounded mt-8 mb-[100vh]"
        onClick={handleSave}
      >
        {loading ? <Loader /> : "Save"}
      </button>
    </div>
  );
};

export default ContentEditor;
