"use client";

import BookEditorLayout from "@/app/ui/book/BookEditorLayout";
import ContentEditor from "@/app/ui/book/ContentEditor";
import { fetcher } from "@/utils/util";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import useSWR from "swr";

const ContentEditorPage = () => {
  const type = useSearchParams().get("type");
  const { bookId } = useParams();

  const { data: chapters } = useSWR(
    `/api/book-info/${bookId}/${type}s`,
    fetcher
  );

  const [title, setTitle] = useState();
  const [activeId, setActiveId] = useState();
  const [activeContent, setActiveContent] = useState();
  const [saved, setSaved] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [contentList, setContentList] = useState();

  useEffect(() => {
    if (!chapters) return;
    for (const chapter of chapters[`${type}`]) {
      if (chapter.id === activeId) {
        setTitle(chapter.title || "");
        setActiveContent(chapter);
      }
    }
  }, [activeId, chapters]);

  useEffect(() => {
    if (chapters) setContentList(chapters[`${type}`]);
  }, [chapters]);

  if (chapters)
    return (
      <BookEditorLayout
        title={title}
        activeId={activeId}
        setActiveId={setActiveId}
        chapterList={chapters[`${type}`]}
        bookId={bookId}
        type={type}
        saved={saved}
        setShowModal={setShowModal}
        setContentList={setContentList}
      >
        {activeId ? (
          <ContentEditor
            content={activeContent}
            title={title}
            setTitle={setTitle}
            bookId={bookId}
            type={type}
            activeId={activeId}
            saved={saved}
            setSaved={setSaved}
            showModal={showModal}
            setActiveId={setActiveId}
            setShowModal={setShowModal}
            setContentList={setContentList}
          />
        ) : (
          <div className="text-xl flex gap-x-2 items-center">
            <FiArrowLeft />
            <p>Select or add content.</p>
          </div>
        )}
      </BookEditorLayout>
    );
};

export default ContentEditorPage;
