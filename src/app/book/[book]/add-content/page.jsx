"use client";

import BookEditorLayout from "@/app/ui/book/BookEditorLayout";
import Loader from "@/app/ui/common/Loader";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddContent = () => {
  const params = useSearchParams();
  console.log(params.get("type"));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState();

  const handleSubmit = async () => {
    if (loading) return;

    if (!title.length) toast.error("Title cannot be empty.");
    if (!content.length) toast.error("Content cannot be empty.");

    try {
      setLoading(true);
      console.log(content);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookEditorLayout chapterList={[]} handleAdd={() => {}}>
      <div className="">
        <input
          className={
            "font-semibold text-2xl mb-2 bg1 outline-none content2 inline-block w-full"
          }
          type="text"
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="prose-xl w-full min-h-48">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
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
        </div>

        <button
          className="primary-btn py-2 px-6 rounded mt-8"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </BookEditorLayout>
  );
};

export default AddContent;
