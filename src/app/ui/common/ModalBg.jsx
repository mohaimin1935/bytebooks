import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext } from "react";

const ModalBg = () => {
  const { modal, setModal } = useContext(ThemeContext);

  if (modal) {
    return (
      <div
        className="absolute left-0 right-0 top-0 bottom-0 m-auto accent1 opacity-60"
        onClick={() => setModal((modal) => !modal)}
      ></div>
    );
  } else {
    return <></>;
  }
};

export default ModalBg;
