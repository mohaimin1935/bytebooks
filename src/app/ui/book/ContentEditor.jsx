"use client";

import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import Loader from "@/app/ui/common/Loader";
import "react-quill/dist/quill.snow.css";
import UploadFile from "../common/UploadFile";
import { LuFileAudio } from "react-icons/lu";

const ContentEditor = ({ content, title, setTitle }) => {
  const [body, setBody] = useState(content?.body || "");
  const [audioUrl, setAudioUrl] = useState(content?.url);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await handleSave();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);
      // post
      console.log(content);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between  mb-8">
        <input
          className={
            "font-semibold text-2xl pb-2 bg1 outline-none content2 inline-block w-full"
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
            className="w-full"
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
        className="primary-btn py-2 px-6 rounded mt-8"
        onClick={handleSave}
      >
        {loading ? <Loader /> : "Save"}
      </button>
    </div>
  );
};

export default ContentEditor;
