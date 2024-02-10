"use client";

import React, { useContext, useState } from "react";
import Modal from "../common/Modal";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

const EditRole = ({ user, setUsers }) => {
  const [role, setRole] = useState(user?.role);

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  const handleChange = async () => {
    if (loading) return;

    try {
      setLoading(true);
      if (user) {
        const res = await axios.patch(`/api/users/${users.id}`, { role });
        setUsers((prev) =>
          prev.map((item) => (item.id === user.id ? { ...res.data } : item))
        );
        toast.success("Success");
      } 
    //   else {
    //     const res = await axios.post(`/api/genre`, { name });
    //     setGenres((prev) => [...prev, res.data]);
    //   }
      
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
        value={role}
        onChange={(e) => setRole(e.target.value)}
        autoFocus
      />

      <div className="mt-12 flex items-center justify-between">
        <button
          className="border border-check px-4 py-1.5 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="accent1 w-24 py-2 rounded" onClick={handleChange}>
          {!loading ? <p>{"Change"}</p> : <Loader />}
        </button>
      </div>
    </Modal>
  );
};

export default EditRole;
