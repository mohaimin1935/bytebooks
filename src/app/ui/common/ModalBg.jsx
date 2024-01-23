import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ModalBg = () => {
  const { modal, setModal } = useContext(ThemeContext);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="absolute left-0 right-0 top-0 bottom-0 m-auto accent1 opacity-60 z-20"
          onClick={() => setModal((modal) => !modal)}
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0.0 }}
          key="modal"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalBg;
