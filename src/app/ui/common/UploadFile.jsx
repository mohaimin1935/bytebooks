"use client";

import React, { useEffect, useRef, useState } from "react";
import { app } from "@/utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { cn } from "@/utils/cn";

const UploadFile = ({
  setURL = () => {},
  initialImage = "",
  className = "",
  aspectRatio = 3 / 4,
  type = "image",
  showImage = false,
  previousUrl,
  recommendedSize,
}) => {
  const [image, setImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(initialImage);
  const [acceptType, setAcceptType] = useState();

  const inputFileRef = useRef();

  useEffect(() => {
    if (type === "image") setAcceptType("image/*");
    else if (type === "audio") {
      setAcceptType("audio/*");
    } else if (type === "video") setAcceptType("video/*");
    else setAcceptType("media_type");
  }, [type]);

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
            if (previousUrl) {
              const prevRef = ref(storage, previousUrl);
              deleteObject(prevRef)
                .then(() => {
                  console.log("deleted");
                })
                .catch((err) => console.log(err));
            }
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
    <div className={cn("relative rounded-md accent1 shadow-lg", className)}>
      <div
        className={cn("absolute inset-0 center content2 m-auto bg2 rounded")}
      >
        <FiUpload size={24} />
      </div>
      <div
        className={cn(
          "center cursor-pointer pb-[133%] relative rounded-md hover:opacity-50 transition duration-300"
        )}
        onClick={() => {
          if (inputFileRef.current) {
            inputFileRef.current.click();
          }
        }}
        style={{
          paddingBottom: `${(1 / aspectRatio) * 100}%`,
          backgroundImage:
            type === "image"
              ? `url(${imageURL})`
              : type === "audio" && showImage
              ? `url(/audio.avif)`
              : "",
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
          accept={acceptType}
        />
      </div>
      {recommendedSize && (
        <div className="absolute -bottom-4 content2 text-xs left-0 right-0 text-center">
          Recommended Size- {recommendedSize}
        </div>
      )}
      {isUploading && (
        <div
          className={
            "absolute bottom-0 left-0 w-full h-full dark-bg px-2 flex items-center accent1 rounded"
          }
        >
          <div className="bg-gray-200 rounded-md w-full mx-2">
            <div
              className="bg-green-400 rounded-md h-1.5"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
