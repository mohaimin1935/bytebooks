import React from "react";
import Modal from "./Modal";
import { FiSearch } from "react-icons/fi";
import SearchBookCard from "../book/cards/SearchBookCard";
import Search from "./Search";

const SearchModal = () => {
  return (
    <Modal>
      <Search />

      <div className="h-6"></div>

      <SearchBookCard />
    </Modal>
  );
};

export default SearchModal;
