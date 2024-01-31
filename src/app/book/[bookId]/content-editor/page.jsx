"use client";

import BookEditorLayout from "@/app/ui/book/BookEditorLayout";
import ContentEditor from "@/app/ui/book/ContentEditor";
import { BookEditContextProvider } from "@/contexts/BookEditContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import BookEditProvider from "@/providers/BookEditProvider";
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

  return (
    <BookEditContextProvider bookId={bookId} type={type}>
      <BookEditProvider>
        <BookEditorLayout>
          <ContentEditor />
        </BookEditorLayout>
      </BookEditProvider>
    </BookEditContextProvider>
  );
};

export default ContentEditorPage;
