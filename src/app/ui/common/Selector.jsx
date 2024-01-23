"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Selector = ({
  options = [],
  addLink = "",
  selected = [],
  setSelected,
  handleRemove,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([options]);

  useEffect(() => {
    console.log(query);
    setSuggestions(options);
    if (query.length > 0 && options) {
      setSuggestions([]);
      options.forEach((r) => {
        let name = r.name.toString().slice(0, query.length).toLowerCase();
        if (name.indexOf(query.toLowerCase()) !== -1) {
          setSuggestions((prev) => [...prev, r]);
        }
      });
    }
  }, [query, options]);

  const handleSelect = (id, name) => {
    const exists = selected.some((item) => item.id === id);
    if (exists) return;

    const newItem = { id, name };
    setSelected((prev) => [...prev, newItem]);
  };

  return (
    <div className="bg1 w-md z-50 absolute top-0 bottom-0 left-0 right-0 m-auto max-w-lg h-[500px] rounded-lg shadow-xl p-8 overflow-auto">
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
          suggestions.map(({ name, id }) => (
            <div
              className="px-2 py-1 my-[2px] bg2 rounded-md hover:bg1 border-2 border-bkg-2 cursor-pointer flex items-center gap-x-2"
              key={id}
              onClick={() => handleSelect(id, name)}
            >
              <div className="w-8 h-8 rounded-full accent2"></div>
              <p>{name}</p>
            </div>
          ))}
        {suggestions.length === 0 && (
          <div className="px-3 py-2">No item found</div>
        )}
      </div>

      <div className="center">
        <Link
          href={addLink}
          className="secondary-btn py-1.5 px-4 mx-auto mt-4 inline-block text-sm"
        >
          {/* TODO: change the wording */}
          Did not find? Create new
        </Link>
      </div>
    </div>
  );
};

export default Selector;
