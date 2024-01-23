"use client";

import React, { useEffect, useRef, useState } from "react";
import { app } from "@/utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

const UploadImage = ({ setURL, initialImage }) => {
  const [image, setImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(initialImage);

  const inputFileRef = useRef();

  useEffect(() => {
    const storage = getStorage(app);

    const upload = () => {
      const name = new Date().getTime() + image.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("paused");
              break;
            case "running":
              console.log("running");
              setIsUploading(true);
              break;
          }
        },
        (error) => {
          setIsUploading(false);
          toast.error("Image upload failed.");
          console.log(error);
        },
        () => {
          setIsUploading(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            setURL(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    };

    image && upload();
  }, [image]);

  return (
    <div className="relative rounded-xl accent1">
      <div className="absolute left-0 right-0 top-0 bottom-0 center m-auto bg2">
        <FiUpload size={24} />
      </div>
      <div
        className="center cursor-pointer pb-[133%] relative rounded-xl hover:opacity-50  transition duration-300"
        onClick={() => {
          if (inputFileRef.current) {
            inputFileRef.current.click();
          }
        }}
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <input
          type="file"
          ref={inputFileRef}
          id=""
          className="hidden"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          accept="image/*"
        />
      </div>
      {isUploading && (
        <div
          className={
            "absolute bottom-0 left-0 w-full h-full dark-bg px-2 flex items-center border-2 accent1 rounded-xl"
          }
        >
          <div className="bg-gray-200 rounded w-full mx-2">
            <div
              className="bg-green-400 rounded h-1.5"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
