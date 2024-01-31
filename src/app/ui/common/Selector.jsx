"use client";

import React, { useState, useEffect, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { ThemeContext } from "@/contexts/ThemeContext";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";
import Modal from "./Modal";

const Selector = ({
  options = [],
  selected = [],
  setSelected,
  handleRemove,
  defaultImage = "",
  hasImage = false,
  creatable = false,
  createApi = "",
  isLoading = false,
  setShowModal = () => {},
  modalType = "",
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
        if (r?.name?.toString().toLowerCase().includes(query.toLowerCase())) {
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
      setSelected((prev) => [...prev, res.data]);
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
    <Modal>
      {selected.map(({ name, id }) => (
        <span
          className="px-2 py-1.5 mr-2 mb-2 rounded inline-flex items-center text-sm bg2"
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
              <p className="capitalize">{name}</p>
            </div>
          ))}
        {suggestions.length === 0 && !isLoading && (
          <div className="px-3 py-2">No item found</div>
        )}
      </div>

      {isLoading && <Loader />}

      <div className="center">
        {!creatable && (
          <button
            onClick={() => setShowModal(modalType)}
            className="secondary-btn py-1.5 px-4 mx-auto mt-4 inline-block text-sm"
          >
            Not found? Create new.
          </button>
        )}

        {creatable && query && (
          <button
            className="secondary-btn py-1.5 px-4 mx-auto mt-4 inline-block text-sm"
            onClick={handleAdd}
          >
            {!loading ? (
              <span>
                Create &quot;
                {query}
                &quot;
              </span>
            ) : (
              <Loader />
            )}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Selector;
