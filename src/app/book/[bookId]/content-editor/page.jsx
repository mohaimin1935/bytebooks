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

  const { data: chapters, isLoading: chaptersLoading } = useSWR(
    `/api/book-info/${bookId}/${type}s`,
    fetcher
  );

  // TODO:
  // bookid ->
  //  - get book title
  //  - get chapters
  //  - add a chapter to get its id (activeId)

  const [title, setTitle] = useState();
  const [activeId, setActiveId] = useState();
  const [activeContent, setActiveContent] = useState();

  useEffect(() => {
    if (!chapters) return;
    for (const chapter of chapters[`${type}`]) {
      if (chapter.id === activeId) {
        setTitle(chapter.title || "");
        setActiveContent(chapter);
      }
    }
  }, [activeId]);

  if (chapters)
    return (
      <BookEditorLayout
        title={title}
        activeId={activeId}
        setActiveId={setActiveId}
        chapterList={chapters[`${type}`]}
        bookId={bookId}
        type={type}
      >
        {activeId ? (
          <ContentEditor
            content={activeContent}
            title={title}
            setTitle={setTitle}
            bookId={bookId}
            type={type}
            activeId={activeId}
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
