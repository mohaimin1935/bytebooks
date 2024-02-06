"use client";

import UploadFile from "@/app/ui/common/UploadFile";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const UpdateProfile = () => {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const [showNewPassword, setShowNewPassword] = useState(false);

  const { data } = useSession();

  return (
    <div>
      {data?.user?.role === "reader" && (
        <button className="secondary-btn py-2 rounded mb-12 block">
          Apply to be Creator
        </button>
      )}

      <div className="flex items-start gap-x-8 relative">
        <UploadFile
          className="w-52"
          setURL={setImage}
          initialImage={image}
          aspectRatio={1}
          previousUrl={image}
          recommendedSize={"1:1"}
        />

        <div className=" flex flex-col gap-y-3">
          <input
            type="text"
            className="auth-input py-2 w-96"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            className="auth-input py-2 w-96"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="relative">
            <input
              type="password"
              className="auth-input py-2 w-96"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="absolute right-2 top-2 bottom-2 text-sm content-highlight"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? "Cancel" : "Update"}
            </button>
          </div>
          {showNewPassword && (
            <input
              type="password"
              className="auth-input py-2 w-96"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
          )}
        </div>
      </div>

      <button className="primary-btn py-2 px-6 rounded mt-20">Save</button>
    </div>
  );
};

export default UpdateProfile;
