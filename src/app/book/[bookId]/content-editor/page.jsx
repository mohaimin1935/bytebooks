"use client";

import BookEditorLayout from "@/app/ui/book/BookEditorLayout";
import ContentEditor from "@/app/ui/book/ContentEditor";
import { ThemeContext } from "@/contexts/ThemeContext";
import { fetcher } from "@/utils/util";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import useSWR from "swr";

const ContentEditorPage = () => {
  const type = useSearchParams().get("type");
  const { bookId } = useParams();
  const { setModal } = useContext(ThemeContext);

  const { data: chapters } = useSWR(
    `/api/book-info/${bookId}/${type}s`,
    fetcher
  );

  useEffect(() => {
    setModal(false);
  }, []);

  useEffect(() => {
    if (chapters) console.log(chapters[`${type}`]);
  }, [chapters]);

  return (
    <BookEditorLayout>
      <ContentEditor />
    </BookEditorLayout>
  );
};

export default ContentEditorPage;
