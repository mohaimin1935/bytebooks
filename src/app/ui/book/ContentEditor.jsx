"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import Loader from "@/app/ui/common/Loader";
import "react-quill/dist/quill.snow.css";
import UploadFile from "../common/UploadFile";
import { LuFileAudio } from "react-icons/lu";
import axios from "axios";
import Modal from "../common/Modal";
import { ThemeContext } from "@/contexts/ThemeContext";
import { FiTrash, FiTrash2 } from "react-icons/fi";
import DeleteConfirm from "../common/DeleteConfirm";

const ContentEditor = ({
  content,
  title,
  setTitle,
  bookId,
  type,
  activeId,
  saved,
  setSaved,
  showModal,
  setActiveId,
  setShowModal,
  setContentList,
}) => {
  const [body, setBody] = useState(content?.content || "");
  const [audioUrl, setAudioUrl] = useState(content?.url);
  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  console.log(audioUrl, content?.audioUrl);

  useEffect(() => {
    setSaved(false);
  }, [title, body, audioUrl]);

  const handleSave = async () => {
    if (loading) return;

    console.log(body);

    const editedContent = {
      title: title,
      content: body,
      audioLink: audioUrl,
    };

    try {
      setLoading(true);
      console.log("before", editedContent);
      const res = await axios.patch(
        `/api/book-info/${bookId}/${type}s/${activeId}`,
        editedContent
      );
      console.log("after", res.data);
      setContentList((prev) => [...prev, res.data]);
      setSaved(true);
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
      {showModal && (
        <Modal className={"h-[200px] w-[400px]"}>
          <p>Save before leaving?</p>
          <div className="flex items-center justify-between mt-12">
            <button
              className="secondary-btn py-1.5 px-4 rounded"
              onClick={() => {
                setActiveId(showModal);
                setShowModal();
                setModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="primary-btn py-1.5 px-4 rounded"
              onClick={async () => {
                await handleSave();
                setActiveId(showModal);
                setShowModal();
                setModal(false);
              }}
            >
              {loading ? <Loader /> : "Save"}
            </button>
          </div>
        </Modal>
      )}

      <div className="flex items-center justify-between  mb-2">
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

      {!saved && (
        <div className="accent2 px-4 py-1">
          You may have unsaved changes. Save before leaving.
        </div>
      )}

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
