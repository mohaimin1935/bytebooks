import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { FiSearch } from "react-icons/fi";
import SearchBookCard from "../book/cards/SearchBookCard";
import Search from "./Search";
import axios from "axios";
import { truncateText } from "@/utils/util";
import AuthorCard from "../author/AuthorCard";
import Loader from "./Loader";
import { ThemeContext } from "@/contexts/ThemeContext";

const SearchModal = ({
  showBooks = true,
  showAuthors = true,
  setValue = () => {},
  global = true,
}) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  useEffect(() => {
    const getResult = async () => {
      setResult([]);
      try {
        setLoading(true);
        const res = await axios.post("/api/search", { query });
        setResult(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    query.length >= 2 ? getResult() : setResult([]);
  }, [query]);

  return (
    <Modal>
      <Search
        value={query}
        setValue={setQuery}
        placeholder="eg, Harry Potter"
      />

      <div className="h-8"></div>

      {loading && <Loader className={"h-4 w-full"} />}

      {result.books?.map((book) =>
        global ? (
          <SearchBookCard
            setValue={setValue}
            key={book.id}
            book={book}
            link={`/reader/view/book/${book.id}`}
          />
        ) : (
          <div>
            <SearchBookCard
              link="#"
              key={book.id}
              book={book}
              global={global}
              setValue={setValue}
            />
          </div>
        )
      )}

      {showAuthors &&
        result.authors?.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}

      {showBooks &&
        result.books?.length === 0 &&
        result.authors?.length === 0 && (
          <div className="text-center">No results found.</div>
        )}
    </Modal>
  );
};

export default SearchModal;
