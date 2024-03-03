import React from 'react'
import BookFlip from './cards/BookFlip';

const BookshelfBooks = ({ books }) => {
  return (
    <div className="flex justify-start items-end gap-x-0 px-4 h-[200px]">
      {books?.map((book, index) => {
        return (
          <div
            className="-ml-16 hover:mr-4 transition-all duration-300"
            key={book.id}
          >
            <BookFlip
              book={book}
              width={140}
              details={false}
              ratio={1.5}
              initialAngle={70}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BookshelfBooks