"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { IoIosCheckbox } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteConfirm from "./DeleteConfirm";
import EditRole from "../user/EditRole";
import AddAuthor from "../author/AddAuthor";
import EditGenre from "../author/EditGenre";
import EditTag from "../author/EditTag";
import Loader from "./Loader";
import { cn } from "@/utils/cn";
import { useSWRConfig } from "swr";

const BookDataTable = ({
  data,
  hasImage = false,
  defaultImage = "",
  // deleteApi = "/api",       //delete
  // type = "",
}) => {
  const [allItems, setAllItems] = useState(data);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(allItems);
  const [checkedList, setCheckedList] = useState([]);
  const [showModal, setShowModal] = useState();
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState();

  const { modal, setModal } = useContext(ThemeContext);

  useEffect(() => {
    if (!modal) setShowModal("");
  }, [modal]);

  useEffect(() => {
    setSuggestions(allItems);
    if (query.length > 0 && allItems) {
      setSuggestions([]);
      allItems.forEach((r) => {
        if (r?.title?.toString().toLowerCase().includes(query.toLowerCase())) {
          setSuggestions((prev) => [...prev, r]);
        }
      });
    }
  }, [query, allItems]);

  useEffect(() => {
    const validCheckedList = checkedList.filter((id) =>
      suggestions.some((item) => item.id === id)
    );
    setCheckedList(validCheckedList);
  }, [suggestions]);

  const handleCancel = () => {
    setModal(false);
    setShowModal("");
  };

  return (
    <div className="px-4">
      {/* search */}
      <div className="flex items-center justify-between gap-x-6 mb-4">
        <input
          type="text"
          className="auth-input py-2 px-4 flex-1"
          autoFocus
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="">
        {suggestions &&
          suggestions.map((item) => (
            <Item
              key={item.id}
              item={item}
              hasImage={hasImage}
              defaultImage={defaultImage}
            />
          ))}
        {suggestions.length === 0 && (
          <div className="px-3 py-2">No item found</div>
        )}
      </div>
    </div>
  );
};

const Item = ({ hasImage, defaultImage, item }) => {
  const { mutate } = useSWRConfig();
  const [isSuspended, setIsSuspended] = useState(item.isSuspended);
  const [loading, setLoading] = useState(false);
  console.log(item.title, item.isSuspended);

  const handleSuspend = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.post(`/api/report/suspend/book/${item.id}`, {
        status: isSuspended ? "unsuspend" : "suspend",
      });
      //mutate("/api/book-info");
      console.log(res.data);
      setIsSuspended(res.data?.isSuspended);
      toast.success("Request approved");
    } catch (error) {
      console.log(error);
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="px-2 py-1 my-[2px] rounded-md hover:bg1 border-b-2 border-bkg-2 flex items-center gap-x-2"
      key={item.id}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-2">
          {hasImage && (
            <img
              className="w-8 h-10 p-[1px] rounded border border-check"
              src={item.image || defaultImage}
              alt="user"
            />
          )}
          <div className="">
            <p className="capitalize">{item.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-6"></div>
      </div>

      <div className="">
        <button
          className={cn(
            "w-32 text-center py-1.5 rounded mr-4",
            !isSuspended
              ? "border-2 border-highlight content-highlight"
              : "border-2 border-emerald-400 text-emerald-500"
          )}
          onClick={handleSuspend}
        >
          {loading ? <Loader /> : isSuspended ? <>Unsuspend</> : <>Suspend</>}
        </button>
      </div>
    </div>
  );
};

export default BookDataTable;
