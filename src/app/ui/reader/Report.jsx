"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useState } from "react";
import { TbMessageReport } from "react-icons/tb";
import Loader from "../common/Loader";
import Modal from "../common/Modal";
import CustomTextArea from "../common/TextArea";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

const Report = ({ bookId, type, contentId }) => {
  const [showModal, setShowModal] = useState();
  const [reportLoading, setReportLoading] = useState(false);
  const [reportText, setReportText] = useState();

  const { setModal } = useContext(ThemeContext);
  const { data } = useSession();
  const userId = data?.user?.id;

  const handleReport = () => {
    setModal(true);
    setShowModal("report");
  };

  const handleCancel = () => {
    setModal(false);
    setShowModal("");
  };

  const saveReport = async () => {
    const body = {
      userId,
      bookId,
      comment: reportText,
    };

    if (type === "byte") {body.bookId = contentId;}
    else if (type === "chapter") {body.chapterId = contentId;}
    
    try {
      setReportLoading(true);
      const res = await axios.post("/api/report", body);
      toast.success("Reported successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setReportLoading(false);
      handleCancel();
    }
  };

  return (
    <div>
      {showModal === "report" && (
        <Modal className={"h-96"}>
          <CustomTextArea
            autoFocus={true}
            maxLength={400}
            maxHeight={400}
            placeholder={"Details..."}
            value={reportText}
            setValue={setReportText}
          />
          <div className="flex items-center justify-between mt-24">
            <button
              className="secondary-btn py-1 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="primary-btn py-1 rounded" onClick={saveReport}>
              {reportLoading ? <Loader /> : <>Report</>}
            </button>
          </div>
        </Modal>
      )}

      <button className="bg2 rounded-full p-4" onClick={handleReport}>
        <TbMessageReport />
      </button>
    </div>
  );
};

export default Report;
