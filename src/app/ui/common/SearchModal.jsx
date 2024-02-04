import React from "react";
import Modal from "./Modal";
import { FiSearch } from "react-icons/fi";
import SearchBookCard from "../book/cards/SearchBookCard";

const SearchModal = () => {
  return (
    <Modal>
      <div className="flex items-center gap-x-3">
        <div className="text-xl">
          <FiSearch />
        </div>
        <input
          type="text"
          className="px-1 py-1 bg1 outline-none content2 border-b text-sm w-full hidden sm:block"
          placeholder="eg, harry potter"
        />
      </div>

      <div className="h-6"></div>

      <SearchBookCard />
    </Modal>
  );
};

export default SearchModal;
