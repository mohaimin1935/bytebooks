"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Loader from "@/app/ui/common/Loader";
import "react-quill/dist/quill.snow.css";
import UploadFile from "../common/UploadFile";
import { LuFileAudio } from "react-icons/lu";
import { BookEditContext } from "@/contexts/BookEditContext";
import { FiArrowLeft, FiTrash } from "react-icons/fi";
import DeleteConfirm from "../common/DeleteConfirm";
import CustomTextArea from "../common/TextArea";
import { useAudioPlayer } from "react-use-audio-player";
import { IoPause, IoPlay } from "react-icons/io5";

const ContentEditor = () => {
  const [uploaded, setUploaded] = useState(false);

  const {
    body,
    setBody,
    audioUrl,
    setAudioUrl,
    activeTitle,
    setActiveTitle,
    handleSave,
    saveLoading,
    switchLoading,
    activeId,
    type,
    saved,
    handleDeleteAudio,
    handleCancelAudioDelete,
    handleConfirmDeleteAudio,
    audioDeleteLoading,
    showModal,
  } = useContext(BookEditContext);

  const { load, togglePlayPause, playing } = useAudioPlayer();

  useEffect(() => {
    if (uploaded) handleSave();
  }, [uploaded]);

  useEffect(() => {
    if (audioUrl) {
      load(audioUrl, {
        html5: true,
        autoplay: false,
        initialVolume: 0.8,
        initialRate: 1.0,
      });
    }
  }, [audioUrl]);

  if (!activeId)
    return (
      <div className="flex gap-x-2 items-center">
        <FiArrowLeft />
        Select or add a {type} to edit.
      </div>
    );

  if (switchLoading)
    return <Loader size={32} className="w-full h-[400px] center" />;

  return (
    <div className="">
      <div className="flex items-center justify-between  mb-2">
        <input
          className={
            "font-semibold text-2xl pb-2 bg1 outline-none content2 inline-block w-full capitalize"
          }
          type="text"
          placeholder="Chapter Title"
          value={activeTitle}
          onChange={(e) => setActiveTitle(e.target.value)}
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
            setUploaded={setUploaded}
          />
          {audioUrl && (
            <>
              {playing ? (
                <IoPause
                  size={32}
                  onClick={togglePlayPause}
                  className="p-2 rounded cursor-pointer"
                />
              ) : (
                <IoPlay
                  size={32}
                  onClick={togglePlayPause}
                  className="p-2 rounded cursor-pointer"
                />
              )}
            </>
          )}
          {audioUrl && (
            <FiTrash
              size={32}
              className="accent2 p-2 rounded cursor-pointer"
              onClick={handleDeleteAudio}
            />
          )}
        </div>
      </div>
      .
      {!saved && (
        <div
          onClick={handleSave}
          className="accent2 px-2 py-2 text-xs cursor-pointer"
        >
          You may have unsaved changes.{" "}
          <span className="border border-bkg-2 px-2 py-1 rounded ">Save</span>{" "}
          before leaving.
        </div>
      )}
      <div className="prose-xl w-full min-h-48">
        {/* <Suspense fallback={() => <>Loading</>}>
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
        </Suspense> */}
        <CustomTextArea
          value={body}
          setValue={setBody}
          placeholder={"Tell a story..."}
          maxLength={-1}
          maxHeight={-1}
        />
      </div>
      <div className="center w-full">
        <button
          className="primary-btn py-2 px-6 rounded mt-8 mb-32 mx-auto"
          onClick={handleSave}
        >
          {saveLoading ? <Loader /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;
