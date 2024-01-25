import { fetcher } from "@/utils/util";
import React from "react";
import useSWR from "swr";
import Loader from "../common/Loader";
import DataTable from "../common/DataTable";

const AuthorList = () => {
  const { data, isLoading } = useSWR("/api/author", fetcher);
  if (isLoading)
    return (
      <div className="mt-16">
        <Loader />
      </div>
    );

  return (
    <DataTable
      data={data}
      hasImage
      defaultImage={"/author.png"}
      deleteApi="/api/author"
      type={"author"}
    />
  );
};

export default AuthorList;
