"use client";

import Loader from "@/app/ui/common/Loader";
import Modal from "@/app/ui/common/Modal";
import UploadFile from "@/app/ui/common/UploadFile";
import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useState } from "react";

const Settings = () => {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [showModal, setShowModal] = useState("");

  const { setModal } = useContext(ThemeContext);

  const handlePassword = () => {
    setModal(true);
    setShowModal("updatePassword");
  };

  const handleEmail = () => {
    setModal(true);
    setShowModal("updateEmail");
  };

  return (
    <div className="center w-full h-full">
      {showModal === "updatePassword" && <Modal>Password</Modal>}

      {showModal === "updateEmail" && <Modal>Email</Modal>}

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
        />

        <button
          className="auth-input w-56 mb-4 text-left"
          onClick={handleEmail}
        >
          test@test.com
        </button>

        <button
          className="auth-input w-56 mb-4 text-left"
          onClick={handlePassword}
        >
          Update Password
        </button>

        <button className="w-56 primary-btn py-2 mt-2">Save</button>
      </div>
    </div>
  );
};

const PasswordUpdate = () => {
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div className="">
      <input
        type="text"
        className="auth-input w-56 mb-4"
        value={password}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="auth-input w-56 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="w-56 primary-btn py-2 mt-2">
        {loading ? <Loader /> : <>Update</>}
      </button>
    </div>
  );
};

const EmailUpdate = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div className="">
      <input
        type="text"
        className="auth-input w-56 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="auth-input w-56 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="w-56 primary-btn py-2 mt-2">
        {loading ? <Loader /> : <>Update</>}
      </button>
    </div>
  );
};


export default Settings;
