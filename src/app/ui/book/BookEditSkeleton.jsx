import React from "react";

const BookEditSkeleton = () => {
  return (
    <div className="border border-bkg-2 shadow rounded-md flex gap-x-4 p-4 my-4 animate-pulse">
      <div className="w-24 rounded h-28 bg2" />
      <div className="w-full">
        <div className="flex flex-col h-full justify-between">
          <div className="w-full">
            <div className="text-xl h-8 font-semibold capitalize bg2 w-32 rounded-full" />
            <div className="text-sm content2 h-6 rounded-full bg2 mt-4"></div>
            <div className="flex">
              <div className="bg2 w-16 h-4 mt-4 rounded-full mr-4"></div>
              <div className="bg2 w-20 h-4 mt-4 rounded-full mr-4"></div>
              <div className="bg2 w-12 h-4 mt-4 rounded-full mr-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEditSkeleton;
