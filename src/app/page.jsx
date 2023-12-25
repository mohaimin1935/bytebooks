"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  return (
    <div className="center h-screen">
      <div className="center">
        <motion.div
          initial={{ opacity: 0, scale: 1, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-64 h-64 rounded-lg"
        >
          <img src="/audiobook.png" alt="audiobook" className="w-full" />
        </motion.div>
        <h3 className="my-16 text-3xl font-semibold text-center">
          Dive into the ultimate collection of books.
        </h3>
        <div className="flex w-[450px] items-center justify-between">
          <Link href="/login" className="primary-btn w-48">
            Login
          </Link>
          <Link href={"/signup"} className="secondary-btn w-48">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
