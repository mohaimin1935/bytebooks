"use client";

import Loader from "@/app/ui/common/Loader";
import Modal from "@/app/ui/common/Modal";
import UploadFile from "@/app/ui/common/UploadFile";
import { ThemeContext } from "@/contexts/ThemeContext";
import { fetcher, validateEmail } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import Input from "../auth/Input";

const UpdateProfile = ({ type = "reader" }) => {
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("Email");
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const { setModal } = useContext(ThemeContext);
  const { data } = useSession();
  const { data: userData, isLoading } = useSWR(
    `/api/users/${data?.user?.id}`,
    fetcher
  );

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
      await axios.patch(`/api/users/${data?.user?.id}`, {
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

  const handleUpload = async () => {
    try {
      const res = await axios.patch(`/api/users/${data?.user?.id}`, {
        name,
        image: image,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async () => {
    try {
      setApplyLoading(true);
      const res = await axios.patch(
        `/api/users/${data?.user?.id}/apply-to-be-creator`,
        {}
      );
      console.log(res.data);
      toast.success("Application submitted");
    } catch (error) {
      console.log(error);
    } finally {
      setApplyLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setImage(userData.image);
    }
  }, [isLoading]);

  useEffect(() => {
    if (uploaded) {
      try {
        handleUpload();
      } catch (error) {
        console.log(error);
      }
    }
  }, [uploaded]);

  return (
    <div className="center w-full h-full">
      {showModal === "updatePassword" && (
        <Modal className={"h-[320px] pt-16 w-[420px]"}>
          <PasswordUpdate handleCancel={handleCancel} />
        </Modal>
      )}

      {showModal === "updateEmail" && (
        <Modal className={"h-[320px] pt-16 w-[420px]"}>
          <EmailUpdate handleCancel={handleCancel} />
        </Modal>
      )}

      <div className="px-16 py-16 rounded-md shadow-xl bg1 center border-2 border-bkg-2">
        <UploadFile
          className="h-40 w-40 rounded-full border-1 mb-12"
          setURL={setImage}
          aspectRatio={1}
          showImage={true}
          previousUrl={image}
          setUploaded={setUploaded}
        />

        <Input
          className=" mb-4"
          setValue={setName}
          type="text"
          value={name}
          placeholder="Name"
        />

        <button
          className="auth-input w-[300PX] mb-4 text-left"
          onClick={handleEmail}
        >
          {email}
        </button>

        <button
          className="auth-input w-[300PX] mb-4 text-left"
          onClick={handlePassword}
        >
          Update Password
        </button>

        <button
          className="w-[300PX] primary-btn py-2 mt-2"
          onClick={handleSave}
        >
          {loading ? <Loader /> : <>Save</>}
        </button>

        {type === "reader" && (
          <button
            className="w-[300PX] secondary-btn py-2 mt-4"
            onClick={handleApply}
          >
            {(applyLoading || !userData) && <Loader />}
            {userData && !applyLoading && userData?.appliedToBeCreator && (
              <>Cancel Creator Application</>
            )}
            {userData && !applyLoading && !userData?.appliedToBeCreator && (
              <>Apply to be Creator</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const PasswordUpdate = ({ handleCancel }) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useSession();

  const handleUpdate = async () => {
    if (loading) return;

    if (!password || !oldPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `/api/users/${data?.user?.id}/change-password`,
        {
          old_password: oldPassword,
          new_password: password,
        }
      );
      console.log(res.data);
      toast.success("Password updated.");
    } catch (error) {
      toast.error("Request failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col center">
      <Input
        className=" mb-4"
        setValue={setPassword}
        type="password"
        value={password}
        placeholder="New Password"
      />
      <Input
        className=" mb-4"
        setValue={setOldPassword}
        type="password"
        value={oldPassword}
        placeholder="Old Password"
      />
      <div className="mt-12 flex items-center justify-between w-[300px]">
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
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useSession();
  const { setModal } = useContext(ThemeContext);

  const handleUpdate = async () => {
    if (loading) return;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email is not valid.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `/api/users/${data?.user?.id}/change-email`,
        {
          email,
          password,
        }
      );
      console.log(res.data);
      toast.success("Email updated");
    } catch (error) {
      console.log(error);
      toast.error("Request failed");
    } finally {
      setLoading(false);
      setModal(false);
    }
  };

  return (
    <div className="flex flex-col center">
      <Input
        className=" mb-4"
        setValue={setEmail}
        type="text"
        value={email}
        placeholder="New Email"
      />
      <Input
        className=" mb-4"
        setValue={setPassword}
        type="password"
        value={password}
        placeholder="Password"
      />
      <div className="mt-12 flex items-center justify-between w-[300px]">
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

export default UpdateProfile;
