"use client";

import { fetcher } from "@/utils/util";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { ThemeContext } from "./ThemeContext";
import DeleteConfirm from "@/app/ui/common/DeleteConfirm";

export const BookEditContext = createContext();

export const BookEditContextProvider = ({ children, bookId, type }) => {
  const { mutate } = useSWRConfig();
  const { setModal } = useContext(ThemeContext);

  const { data, isLoading } = useSWR(
    `/api/book-info/${bookId}/${type}s`,
    fetcher
  );
  const { data: book } = useSWR(`/api/book-info/${bookId}`, fetcher);

  const [chapters, setChapters] = useState([]);
  const [activeId, setActiveId] = useState();
  const [showModal, setShowModal] = useState();

  const [activeTitle, setActiveTitle] = useState();
  const [body, setBody] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [saved, setSaved] = useState();

  const [unsavedOrder, setUnsavedOrder] = useState(false);

  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [reorderLoading, setReorderLoading] = useState(false);

  const addChapter = async () => {
    if (addLoading) return;

    try {
      setAddLoading(true);
      const res = await axios.post(`/api/book-info/${bookId}/${type}s`, {
        serial: chapters.length,
        title: `${type} ${chapters.length + 1}`,
      });
      mutate(`/api/book-info/${bookId}/${type}s`);
      setChapters((prev) => [...prev, res.data]);
      setActiveId(res.data.id);
      toast.success("Chapter Added");
    } catch (error) {
      toast.error("Request failed.");
      console.log(error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = () => {
    setModal(true);
    setShowModal("delete");
  };

  const handleCancel = () => {
    setModal(false);
    setShowModal("");
  };

  const handleDeleteConfirm = async () => {
    if (deleteLoading) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`/api/book-info/${bookId}/${type}s/${activeId}`);
      mutate(`/api/book-info/${bookId}/${type}s`);
      setChapters((prev) => prev.filter((item) => item.id !== activeId));
      toast.success("Deleted successfully");
      setActiveId();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setDeleteLoading(false);
      setShowModal("");
      setModal(false);
    }
  };

  const switchActiveId = async (id) => {
    // try {
    //   setSwitchLoading(true);
    //   await handleSave();
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setSwitchLoading(false);
    // }
    setActiveId(id);
  };

  const handleSave = async () => {
    if (saveLoading || deleteLoading) return;
    if (!activeId) return;

    try {
      setSaveLoading(true);
      await axios.patch(`/api/book-info/${bookId}/${type}s/${activeId}`, {
        title: activeTitle,
        content: body,
        audioLink: audioUrl,
      });
      mutate(`/api/book-info/${bookId}/${type}s`);
      toast.success("Saved successfully");
      setSaved(true);
    } catch (error) {
      toast.error("Could not save");
      console.log(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleReorder = (values) => {
    setUnsavedOrder(true);
    setChapters(values);
  };

  const handleOrderSave = async () => {
    setReorderLoading(true);
    chapters.forEach(async (value, index) => {
      try {
        await axios.patch(`/api/book-info/${bookId}/${type}s/${value.id}`, {
          serial: index,
        });
      } catch (error) {
        console.log(error);
        toast.error("Order update failed");
        setReorderLoading(false);
        return;
      }
    });
    toast.success("Order updated");
    setReorderLoading(false);
    setUnsavedOrder(false);
  };

  useEffect(() => {
    let index = chapters?.findIndex((item) => item.id === activeId);

    setBody();
    setAudioUrl();
    setActiveTitle();
    setSaved(true);

    if (index !== -1 && chapters) {
      setBody(chapters[index].content);
      setAudioUrl(chapters[index].audioLink);
      setActiveTitle(chapters[index].title);
    }
    setSaved(true);
  }, [activeId, chapters]);

  useEffect(() => {
    setSaved(false);
  }, [activeTitle, body, audioUrl]);

  useEffect(() => {
    if (data) {
      if (type === "byte") {
        setChapters(data?.byte);
      } else if (type === "chapter") {
        setChapters(data?.chapters);
      }
    }
  }, [bookId, data]);

  useEffect(() => {
    setModal(false);
  }, []);

  return (
    <BookEditContext.Provider
      value={{
        chapters,
        activeId,
        activeTitle,
        setActiveTitle,
        body,
        setBody,
        audioUrl,
        setAudioUrl,
        bookId,
        type,
        book,
        addChapter,
        addLoading,
        deleteLoading,
        handleDelete,
        handleSave,
        switchActiveId,
        switchLoading,
        saveLoading,
        saved,
        handleReorder,
        isLoading,
        unsavedOrder,
        handleOrderSave,
        reorderLoading,
      }}
    >
      {showModal === "delete" && (
        <DeleteConfirm
          handleDeleteConfirm={handleDeleteConfirm}
          handleCancel={handleCancel}
          loading={deleteLoading}
        />
      )}
      {children}
    </BookEditContext.Provider>
  );
};
