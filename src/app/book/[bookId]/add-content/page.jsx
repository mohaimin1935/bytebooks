"use client";

import BookEditorLayout from "@/app/ui/book/BookEditorLayout";
import ContentEditor from "@/app/ui/book/ContentEditor";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const AddContent = () => {
  const params = useSearchParams();
  console.log(params.get("type"));

  // TODO:
  // bookid ->
  //  - get book title
  //  - get chapters
  //  - add a chapter to get its id (activeId)

  const [title, setTitle] = useState();

  return (
    <BookEditorLayout title={title} activeId={1} chapterList={[]}>
      <ContentEditor title={title} setTitle={setTitle} />
    </BookEditorLayout>
  );
};

export default AddContent;
