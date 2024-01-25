import React from "react";
import Modal from "./Modal";
import Loader from "./Loader";

const DeleteConfirm = ({ handleCancel, handleDeleteConfirm, loading }) => {
  return (
    <Modal className={"h-[200px] w-[400px]"}>
      <div className="text-xl">Confirm delete?</div>
      <div className="mt-12 flex items-center justify-between">
        <button
          className="border border-check px-4 py-1.5 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="accent2 w-24 py-2 rounded"
          onClick={handleDeleteConfirm}
        >
          {!loading ? <p>Delete</p> : <Loader />}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
