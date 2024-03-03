import { fetcher } from "@/utils/util";
import React from "react";
import useSWR from "swr";
import Loader from "../common/Loader";
import UserDataTable from "../common/UserDataTable";

const UserList = () => {
  const { data, isLoading } = useSWR("/api/users", fetcher);
  if (isLoading)
    return (
      <div className="mt-16">
        <Loader />
      </div>
    );

  return <UserDataTable data={data} hasImage defaultImage={"/author.png"} />;
};

export default UserList;
