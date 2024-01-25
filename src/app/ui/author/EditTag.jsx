import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useState } from "react";
import Modal from "../common/Modal";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const EditTag = ({ tag, setTags }) => {
  const [name, setName] = useState(tag?.name);

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);

  const handleAdd = async () => {
    if (loading) return;

    try {
      setLoading(true);
      if (tag) {
        const res = await axios.patch(`/api/tag/${tag.id}`, { name });
        setTags((prev) =>
          prev.map((item) => (item.id === tag.id ? { ...res.data } : item))
        );
      } else {
        const res = await axios.post(`/api/tag`, { name });
        setTags((prev) => [...prev, res.data]);
      }
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Request failed");
    } finally {
      setModal(false);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <Modal className={"h-[300px]"}>
      <div className="text-xl">Tag</div>
      <input
        className="auth-input w-full my-4"
        type="text"
        placeholder="tag"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />

      <div className="mt-12 flex items-center justify-between">
        <button
          className="border border-check px-4 py-1.5 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="accent1 w-24 py-2 rounded" onClick={handleAdd}>
          {!loading ? <p>{tag ? "Save" : "Add"}</p> : <Loader />}
        </button>
      </div>
    </Modal>
  );
};

export default EditTag;
