import React from "react";
import Loader from "../common/Loader";
import BookFlip from "./cards/BookFlip";

const BookList = ({ isLoading, books }) => {
  return (
    <div>
      <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
        {isLoading ? (
          //   <Loader className="h-64" />
          <>
            <div className="w-[180px] h-[240px] bg2 animate-pulse">
              <Loader className="h-full" />
            </div>
            <div className="w-[180px] h-[240px] bg2 animate-pulse">
              <Loader className="h-full" />
            </div>
            <div className="w-[180px] h-[240px] bg2 animate-pulse">
              <Loader className="h-full" />
            </div>
          </>
        ) : (
          <>
            {books?.length > 0 ? (
              books?.map((book) => (
                <BookFlip
                  width={180}
                  details={true}
                  audio={false}
                  book={book}
                  key={book.id}
                  ratio={1.4}
                  className={""}
                />
              ))
            ) : (
              <div className="h-56 w-full center">No books available</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookList;
