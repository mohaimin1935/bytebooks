"use client";

import { fetcher } from "@/utils/util";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

const Online = () => {
  // get
  const { data: books } = useSWR("/api/book-info", fetcher);

  console.log(books);

  // post

  // put / delete

  if (books)
    return (
      <div>
        {books?.map((book) => (
          <EditBook key={book.id} book={book} />
        ))}
      </div>
    );
};

export default Online;

const EditBook = ({ book }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(book.title);

  const handleShow = () => {
    setShow(!show);
    console.log(show);
  };

  const handleSave = async () => {
    console.log(title);
    try {
      const res = await axios.put(`/api/book-info/${book.id}`, {
        title: title,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <>
      <h3 className="">{book.title}</h3>
      <button className="btn-online" onClick={() => handleShow()}>
        Edit
      </button>
      {show && (
        <>
          <input
            className="input-online"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn-online" onClick={handleSave}>
            Save
          </button>
        </>
      )}
    </>
  );
};
