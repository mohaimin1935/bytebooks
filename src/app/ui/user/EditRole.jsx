"use client";

import React, { useContext, useState } from "react";
import Modal from "../common/Modal";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

const EditRole = ({ genre, setGenres }) => {
  const [name, setName] = useState(genre?.name);

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  const handleAdd = async () => {
    if (loading) return;

    try {
      setLoading(true);
      if (genre) {
        const res = await axios.patch(`/api/genre/${genre.id}`, { name });
        setGenres((prev) =>
          prev.map((item) => (item.id === genre.id ? { ...res.data } : item))
        );
      } else {
        const res = await axios.post(`/api/genre`, { name });
        setGenres((prev) => [...prev, res.data]);
      }
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Request failed");
    } finally {
      setModal(false);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <Modal className={"h-[300px]"}>
      <div className="text-xl">Role</div>
      <input
        className="auth-input w-full my-4"
        type="text"
        placeholder="e.g. reader, creator, admin"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />

      <div className="mt-12 flex items-center justify-between">
        <button
          className="border border-check px-4 py-1.5 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="accent1 w-24 py-2 rounded" onClick={handleAdd}>
          {!loading ? <p>{"Change"}</p> : <Loader />}
        </button>
      </div>
    </Modal>
  );
};

export default EditRole;
