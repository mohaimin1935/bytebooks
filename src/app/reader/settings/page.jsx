"use client";

import Loader from "@/app/ui/common/Loader";
import Modal from "@/app/ui/common/Modal";
import UploadFile from "@/app/ui/common/UploadFile";
import { ThemeContext } from "@/contexts/ThemeContext";
import { fetcher } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const Settings = () => {
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);
  const { data } = useSession();
  const {
    data: userData,
    isLoading,
    error,
  } = useSWR(`/api/users/${data?.user?.id}`, fetcher);

  const handlePassword = () => {
    setModal(true);
    setShowModal("updatePassword");
  };

  const handleEmail = () => {
    setModal(true);
    setShowModal("updateEmail");
  };

  const handleCancel = () => {
    setModal(false);
    setShowModal("");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/users/${data?.user?.id}`, {
        name,
        image: image,
      });
      toast.success("Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setName(userData.name);
      setEmail(userData.email);
      setImage(userData.image);
    }
  }, [isLoading]);

  return (
    <div className="center w-full h-full">
      {showModal === "updatePassword" && (
        <Modal className={"h-[320px] pt-16"}>
          <PasswordUpdate handleCancel={handleCancel} />
        </Modal>
      )}

      {showModal === "updateEmail" && (
        <Modal className={"h-[320px] pt-16"}>
          <EmailUpdate handleCancel={handleCancel} />
        </Modal>
      )}

      <div className="px-16 py-16 rounded-md shadow-xl bg1 center">
        <UploadFile
          className="h-40 w-40 rounded-full border-1 mb-12"
          setURL={setImage}
          aspectRatio={1}
          showImage={true}
          previousUrl={image}
        />

        <input
          type="text"
          className="auth-input w-56 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <button
          className="auth-input w-56 mb-4 text-left"
          onClick={handleEmail}
        >
          {email}
        </button>

        <button
          className="auth-input w-56 mb-4 text-left"
          onClick={handlePassword}
        >
          Update Password
        </button>

        <button className="w-56 primary-btn py-2 mt-2" onClick={handleSave}>
          {loading ? <Loader /> : <>Save</>}
        </button>

        <button className="w-56 secondary-btn py-2 mt-4">
          Apply to be Creator
        </button>
      </div>
    </div>
  );
};

const PasswordUpdate = ({ handleCancel }) => {
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {};

  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="auth-input w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />
      <input
        type="text"
        className="auth-input w-full mb-2"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Old Password"
      />
      <div className="mt-12 flex items-center justify-between">
        <button
          className="border border-check px-4 py-1.5 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="accent1 w-24 py-2 rounded" onClick={handleUpdate}>
          {!loading ? <p>Update</p> : <Loader />}
        </button>
      </div>
    </div>
  );
};

const EmailUpdate = ({ handleCancel }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {};

  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="auth-input w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New Email"
      />
      <input
        type="text"
        className="auth-input w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="mt-12 flex items-center justify-between">
        <button
          className="border border-check px-4 py-1.5 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="accent1 w-24 py-2 rounded" onClick={handleUpdate}>
          {!loading ? <p>Update</p> : <Loader />}
        </button>
      </div>
    </div>
  );
};

export default Settings;
