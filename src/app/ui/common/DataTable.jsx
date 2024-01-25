import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";

const DataTable = ({ data, hasImage = false, columns }) => {
  const [allItems, setAllItems] = useState(data);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(allItems);

  const { modal, setModal } = useContext(ThemeContext);

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

  return (
    <div className="px-4">
      <div className="flex items-center justify-between gap-x-16 mb-8">
        <input
          type="text"
          className="auth-input w-96 flex-1"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="accent1 p-3 text-white rounded">
          <IoAdd size={20} />
        </button>
      </div>

      <div className="h-[300px]">
        {suggestions &&
          suggestions.map((item) => (
            <Item key={item.id} hasImage={hasImage} item={item} />
          ))}
        {suggestions.length === 0 && !isLoading && (
          <div className="px-3 py-2">No item found</div>
        )}
      </div>
    </div>
  );
};

const Item = ({ hasImage, item }) => {
  return (
    <div
      className="px-2 py-1 my-[2px] bg2 rounded-md hover:bg1 border-2 border-bkg-2 cursor-pointer flex items-center gap-x-2"
      key={item.id}
    >
      {hasImage && (
        <img
          className="w-8 h-8 p-[1px] rounded-full border border-check"
          src={item.image || defaultImage}
          alt="author"
        />
      )}
      <p className="capitalize">{item.name}</p>
    </div>
  );
};

export default DataTable;
