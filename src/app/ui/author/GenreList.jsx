import React from "react";
import DataTable from "../common/DataTable";
import useSWR from "swr";
import { fetcher } from "@/utils/util";
import Loader from "../common/Loader";

const GenreList = () => {
  const { data, isLoading } = useSWR("/api/genre", fetcher);

  if (isLoading)
    return (
      <div className="mt-16">
        <Loader />
      </div>
    );

  return (
    <DataTable
      data={data}
      hasImage={false}
      deleteApi="/api/genre"
      type="genre"
    />
  );
};

export default GenreList;
