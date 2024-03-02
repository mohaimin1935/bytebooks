import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { IoIosCheckbox } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteConfirm from "./DeleteConfirm";
import EditRole from "../user/EditRole";
import AddAuthor from "../author/AddAuthor";
import EditGenre from "../author/EditGenre";
import EditTag from "../author/EditTag";
import { cn } from "@/utils/cn";
import useSWR from "swr";
import { fetcher } from "@/utils/util";
import Loader from "./Loader";

const UserDataTable = ({
  data,
  hasImage = false,
  defaultImage = "",
  // deleteApi = "/api",       //delete
  // type = "",
}) => {
  const [allItems, setAllItems] = useState(data);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(allItems);
  const [checkedList, setCheckedList] = useState([]);
  const [showModal, setShowModal] = useState();
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState();
  const [showCreatorApplicant,setShowCreatorApplicant] = useState(false);

  const { modal, setModal } = useContext(ThemeContext);

  useEffect(() => {
    if (!modal) setShowModal("");
  }, [modal]);

  useEffect(() => {
    setSuggestions(allItems);
    if (allItems) {
      setSuggestions([]);
      allItems.forEach((r) => {
        if (
          (r?.name?.toString().toLowerCase().includes(query.toLowerCase()) ||
          r?.email?.toString().toLowerCase().includes(query.toLowerCase()) ||
          r?.role?.toString().toLowerCase().includes(query.toLowerCase())) &&
          (!showCreatorApplicant || r?.appliedToBeCreator?.toString() === "true")
        ) {
          setSuggestions((prev) => [...prev, r]);
        }
      });
    }
  }, [query, allItems, showCreatorApplicant]);

  useEffect(() => {
    const validCheckedList = checkedList.filter((id) =>
      suggestions.some((item) => item.id === id)
    );
    setCheckedList(validCheckedList);
  }, [suggestions]);

  const handleEdit = (id) => {
    setModal(true);
    setActionId(id);
    setShowModal(`edit-role`);
  };

  const handleApplicantFilter = (e) => {
    if (!showCreatorApplicant) {
      setShowCreatorApplicant(true);
    }
    else {
      setShowCreatorApplicant(false);
    }
  }

  return (
    <div className="px-4">
      {showModal === "edit-role" && (
        <EditRole
          setUsers={setAllItems}
          user={allItems.find((item) => item.id === actionId)}
        />
      )}

      {/* search */}
      <div className="flex items-center justify-between gap-x-6 mb-4">
        <input
          type="text"
          className="auth-input py-2 px-4 flex-1"
          autoFocus
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="flex gap-x-2 items-center" onClick={handleApplicantFilter}>
          {showCreatorApplicant? <div className="w-4 h-4 rounded accent1"></div> : <div className="w-4 h-4 rounded border border-check"></div>} Creator Applicants
        </button>
      </div>

      <div className="">
        {suggestions &&
          suggestions.map((item) => (
            <Item
              key={item.id}
              item={item}
              defaultImage={defaultImage}
              handleEdit={handleEdit}
            />
          ))}
        {suggestions.length === 0 && (
          <div className="px-3 py-2">No item found</div>
        )}
      </div>
    </div>
  );
};

const Item = ({ defaultImage, item, handleEdit }) => {
  // console.log(item);
  const [loading, setLoading] = useState(false);

  const { data } = useSWR(`/api/users/${item.id}`, fetcher, {
    refreshInterval: 200,
  });

  const handleApprove = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.patch(`/api/users/${item.id}`, {
        role: "creator",
        appliedToBeCreator: false,
      });
      toast.success("Creator application approved");
    } catch (error) {
      console.log(error);
      toast.error("Request Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex items-center gap-x-3 my-2 flex-1">
        <img
          className="w-12 h-12 p-[1px] rounded-full border border-check"
          src={item.image || defaultImage}
          alt="author"
        />
        <div className="">
          <p className="relative">
            {item.name}
            <div
              className={cn(
                "absolute right-5 top-0 text-xs rounded px-1",
                item.role === "admin" && "accent2",
                item.role === "creator" && "accent1",
                item.role === "reader" && "border border-check"
              )}
            >
              {item.role}
            </div>
          </p>
          <p className="text-sm">{item.email}</p>
        </div>
      </div>

      {data?.appliedToBeCreator && (
        <button
          onClick={() => handleApprove()}
          className="bg2 px-3 py-1.5 rounded mr-4"
        >
          {loading ? <Loader /> : <>Approve Creator Application</>}
        </button>
      )}
      <FiEdit
        className="cursor-pointer p-1"
        size={24}
        onClick={() => handleEdit(item.id)}
      />
    </div>
  );
};

export default UserDataTable;
