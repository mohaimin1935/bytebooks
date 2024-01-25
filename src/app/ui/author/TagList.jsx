import { fetcher } from "@/utils/util";
import React from "react";
import useSWR from "swr";
import DataTable from "../common/DataTable";
import Loader from "../common/Loader";

const TagList = () => {
  const { data, isLoading } = useSWR("/api/tag", fetcher);

  if (isLoading)
    return (
      <div className="mt-16">
        <Loader />
      </div>
    );

  return (
    <DataTable data={data} hasImage={false} deleteApi="/api/tag" type="tag" />
  );
};

export default TagList;
