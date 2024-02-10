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

  const { modal, setModal } = useContext(ThemeContext);

  useEffect(() => {
    if (!modal) setShowModal("");
  }, [modal]);

  useEffect(() => {
    setSuggestions(allItems);
    if (query.length > 0 && allItems) {
      setSuggestions([]);
      allItems.forEach((r) => {
        if (r?.name?.toString().toLowerCase().includes(query.toLowerCase())) {
          setSuggestions((prev) => [...prev, r]);
        }
      });
    }
  }, [query, allItems]);

  useEffect(() => {
    const validCheckedList = checkedList.filter((id) =>
      suggestions.some((item) => item.id === id)
    );
    setCheckedList(validCheckedList);
  }, [suggestions]);

  // const toggleCheck = (id) => {
  //   const index = checkedList.indexOf(id);

  //   if (index !== -1) {
  //     let temp = [...checkedList];
  //     temp.splice(index, 1);
  //     setCheckedList(temp);
  //   } else {
  //     setCheckedList((prev) => [...prev, id]);
  //   }
  // };

  const handleEdit = (id) => {
    setModal(true);
    setActionId(id);
    setShowModal(`edit-role`);
  };

  // const handleDelete = (id) => {
  //   setModal(true);
  //   setShowModal("delete");
  //   setActionId(id);
  // };

  const handleCancel = () => {
    setModal(false);
    setShowModal("");
  };

  // const handleDeleteConfirm = async () => {
  //   if (loading) return;

  //   try {
  //     setLoading(true);
  //     await axios.delete(`${deleteApi}/${actionId}`);
  //     toast.success("Deleted successfully");
  //     let items = allItems;
  //     items = items.filter((item) => item.id !== actionId);
  //     setAllItems(items);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //     setModal(false);
  //     setShowModal("");
  //   }
  // };

  // const handleDeleteSelected = () => {
  //   if (!checkedList?.length > 0) return;

  //   setModal(true);
  //   setShowModal("delete-selected");
  // };

  // const handleDeleteSelectedConfirm = async () => {
  //   if (loading) return;

  //   try {
  //     setLoading(true);
  //     checkedList.forEach(async (item) => {
  //       await axios.delete(`${deleteApi}/${item}`);
  //     });
  //     toast.success("Deleted successfully");
  //     let items = allItems;
  //     items = items.filter((item) => !checkedList.includes(item.id));
  //     setAllItems(items);
  //     setCheckedList([]);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //     setModal(false);
  //     setShowModal("");
  //   }
  // };

  // const handleAdd = () => {
  //   setModal(true);
  //   setShowModal(`add-${type}`);
  // };

  // const handleToggleSelectAll = () => {
  //   if (checkedList.length === suggestions.length) setCheckedList([]);
  //   else {
  //     setCheckedList([]);
  //     setCheckedList(suggestions.map((item) => item.id));
  //   }
  // };

  return (
    <div className="px-4">
      {/* {showModal === "delete" && (
        <DeleteConfirm
          handleCancel={handleCancel}
          handleDeleteConfirm={handleDeleteConfirm}
          loading={loading}
        />
      )}

      {showModal === "delete-selected" && (
        <DeleteConfirm
          handleCancel={handleCancel}
          handleDeleteConfirm={handleDeleteSelectedConfirm}
          loading={loading}
        />
      )} */}

      {/* {showModal === "add-genre" && <EditGenre setGenres={setAllItems} />} */}

      {showModal === "edit-role" && (
        <EditRole
          setGenres={setAllItems}
          genre={allItems.find((item) => item.id === actionId)}
        />
      )}

      {/* {showModal === "add-tag" && <EditTag setTags={setAllItems} />}

      {showModal === "edit-tag" && (
        <EditTag
          setTags={setAllItems}
          tag={allItems.find((item) => item.id === actionId)}
        />
      )} */}

      {/* {showModal === "add-author" && <AddAuthor setAuthors={setAllItems} />}

      {showModal === "edit-author" && (
        <AddAuthor
          setAuthors={setAllItems}
          author={allItems.find((item) => item.id === actionId)}
        />
      )} */}

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
        {/* <button
          className="px-3 py-1.5 border border-check rounded"
          onClick={handleToggleSelectAll}
        >
          {checkedList.length === suggestions.length ? "Deselect" : "Select"}{" "}
          All
        </button>
        <button
          onClick={handleDeleteSelected}
          className="accent2 p-2.5 text-white rounded cursor-pointer"
        >
          <FiTrash size={20} />
        </button>
        <button
          onClick={handleAdd}
          className="accent1 p-2.5 text-white rounded"
        >
          <IoAdd size={20} />
        </button> */}
      </div>

      <div className="">
        {suggestions &&
          suggestions.map((item) => (
            <Item
              key={item.id}
              item={item}
              hasImage={hasImage}
              defaultImage={defaultImage}
              // checkedList={checkedList}
              // toggleCheck={toggleCheck}
              // handleDelete={handleDelete}
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

const Item = ({
  hasImage,
  defaultImage,
  item,
  // checkedList,
  // toggleCheck,
  handleEdit,
  // handleDelete,
}) => {
  return (
    <div
      className="px-2 py-1 my-[2px] rounded-md hover:bg1 border-b-2 border-bkg-2 flex items-center gap-x-2"
      key={item.id}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-2">
          {/* <button className={"mr-2"} onClick={() => toggleCheck(item.id)}>
            {checkedList.includes(item.id) ? (
              <IoIosCheckbox size={20} />
            ) : (
              <MdOutlineCheckBoxOutlineBlank size={20} />
            )}
          </button> */}
          {hasImage && (
            <img
              className="w-8 h-8 p-[1px] rounded-full border border-check"
              src={item.image || defaultImage}
              alt="user"
            />
          )}
          {/* change capitalize, show real name */}
          <p className="capitalize">{item.name + " ("+"a@a.com"+ ") ("+"reader"+")"}</p> 
        </div>
        <div className="flex items-center gap-x-6">
          <FiEdit
            className="cursor-pointer p-1"
            size={24}
            onClick={() => handleEdit(item.id)}
          />
          {/* <FiDelete
            className="cursor-pointer content-highlight p-1"
            size={28}
            onClick={() => handleDelete(item.id)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default UserDataTable;
