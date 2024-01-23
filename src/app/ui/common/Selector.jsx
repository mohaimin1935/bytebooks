"use client";

import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "@/contexts/ThemeContext";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

const Selector = ({
  options = [],
  addLink = "",
  selected = [],
  setSelected,
  handleRemove,
  defaultImage = "",
  hasImage = false,
  creatable = false,
  createApi = "",
  isLoading = false,
}) => {
  const [allItems, setAllItems] = useState(options);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(allItems);
  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  useEffect(() => {
    setSuggestions(allItems);
    if (query.length > 0 && allItems) {
      setSuggestions([]);
      allItems.forEach((r) => {
        let name = r?.name?.toString().slice(0, query.length).toLowerCase();
        if (name?.indexOf(query.toLowerCase()) !== -1) {
          setSuggestions((prev) => [...prev, r]);
        }
      });
    }
  }, [query, allItems]);

  const handleSelect = (id, name) => {
    const exists = selected.some((item) => item.id === id);
    if (exists) return;

    const newItem = { id, name };
    setSelected((prev) => [...prev, newItem]);
  };

  const handleAdd = async () => {
    if (loading) return;

    const newName = query;
    if (!newName) {
      toast.error("Write something to add");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(createApi, { name: newName });
      setAllItems((prev) => [...prev, res.data]);
      console.log(res);
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="bg1 w-md z-50 absolute top-0 bottom-0 left-0 right-0 m-auto max-w-lg h-[560px] rounded-lg shadow-xl p-8 pt-12 overflow-auto"
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0.0 }}
      >
        <div
          className="absolute right-4 top-4 cursor-pointer p-2"
          onClick={() => setModal(false)}
        >
          <IoMdClose size={24} />
        </div>
        {selected.map(({ name, id }) => (
          <span
            className="px-2 py-1.5 mr-2 rounded inline-flex items-center text-sm bg2"
            key={id}
          >
            {name}
            <button className="pl-2" onClick={() => handleRemove(id)}>
              <IoMdClose />
            </button>
          </span>
        ))}
        <input
          type="text"
          className="auth-input w-full mb-2 mt-4"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="h-[300px] overflow-auto">
          {suggestions &&
            suggestions.map(({ name, id, image }) => (
              <div
                className="px-2 py-1 my-[2px] bg2 rounded-md hover:bg1 border-2 border-bkg-2 cursor-pointer flex items-center gap-x-2"
                key={id}
                onClick={() => handleSelect(id, name)}
              >
                {hasImage && (
                  <img
                    className="w-8 h-8 p-[1px] rounded-full border border-check"
                    src={image || defaultImage}
                    alt="author"
                  />
                )}
                <p>{name}</p>
              </div>
            ))}
          {suggestions.length === 0 && !isLoading && (
            <div className="px-3 py-2">No item found</div>
          )}
        </div>

        {isLoading && <Loader />}

        <div className="center">
          {!creatable && (
            <Link
              href={addLink}
              className="secondary-btn py-1.5 px-4 mx-auto mt-4 inline-block text-sm"
            >
              {/* TODO: change the wording */}
              Not found? Create new.
            </Link>
          )}

          {creatable && query && (
            <button
              className="secondary-btn py-1.5 px-4 mx-auto mt-4 inline-block text-sm"
              onClick={handleAdd}
            >
              {!loading ? <span>Create "{query}"</span> : <Loader />}
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Selector;
