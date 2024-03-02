"use client";

import React, { useContext, useState } from "react";
import Modal from "../common/Modal";
import { ThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";

const EditRole = ({ user, setUsers }) => {

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  const handleEdit = async (role) => {
    if (loading) return;

    try {
      setLoading(true);
      if (user) {
        const res = await axios.patch(`/api/users/${user.id}`, { role: role });
        setUsers((prev) =>
          prev.map((item) => (item.id === user.id ? { ...res.data } : item))
        );
        toast.success("Role updated to " + role);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Request failed");
    } finally {
      setModal(false);
      setLoading(false);
    }
  };


  return (
    <Modal className={"h-[300px]"}>
      <div className="text-xl mb-4">Role</div>
      <div
        className="flex items-center gap-x-4 cursor-pointer my-3"
        onClick={() => handleEdit("reader")}
      >
        <span
          className={cn(
            "w-6 h-6 rounded-full border border-check",
            user?.role === "reader" && "accent1"
          )}
        ></span>
        <p className="">Reader</p>
      </div>

      <div
        className="flex items-center gap-x-4 cursor-pointer my-3"
        onClick={() => handleEdit("creator")}
      >
        <span
          className={cn(
            "w-6 h-6 rounded-full border border-check",
            user?.role === "creator" && "accent1"
          )}
        ></span>
        <p className="">Creator</p>
      </div>

      <div
        className="flex items-center gap-x-4 cursor-pointer my-3"
        onClick={() => handleEdit("admin")}
      >
        <span
          className={cn(
            "w-6 h-6 rounded-full border border-check",
            user?.role === "admin" && "accent1"
          )}
        ></span>
        <p className="">Admin</p>
      </div>
    </Modal>
  );
};

export default EditRole;
