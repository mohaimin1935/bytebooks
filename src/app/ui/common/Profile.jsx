"use client";

import UploadFile from "@/app/ui/common/UploadFile";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { FiBookOpen, FiEdit, FiPenTool } from "react-icons/fi";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PieChartCustom from "./charts/PieChartCustom";
import Calendar from "../reader/Calendar";
import BookFlip from "../book/cards/BookFlip";
import PrevNext from "./PrevNext";

const Profile = () => {
  return (
    <div>
      <Banner />

      <div className="flex mt-16">
        {/* left */}
        <div className="w-1/3">
          <StatOverView />
          <div className="mr-16">
            <h3 className="section-header mt-12 mb-8">This Week</h3>
            <Calendar />
          </div>
        </div>
        {/* right */}
        <div className="w-2/3">
          <GenreStat />
        </div>
      </div>

      <RecentReads />
    </div>
  );
};

export default Profile;

const SingleStat = () => {
  return (
    <div className="bg2 p-2 rounded-full flex items-center justify-between w-72">
      <p className="ml-6">Genre A</p>{" "}
      <p className="px-3 py-1.5 accent1 rounded-full">30</p>
    </div>
  );
};

const Banner = () => {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  return (
    <div className="h-72 accent1 rounded-xl shadow relative center">
      {/* profile image */}
      <div className="absolute top-0 right-20 pt-12 p-4 rounded-b-full bg2">
        <UploadFile
          className="h-40 w-40 rounded-full border-1"
          setURL={setImage}
          aspectRatio={1}
          showImage={true}
          previousUrl={image}
        />
      </div>

      {/* profile info */}
      <div className="absolute top-12 left-20">
        {/* name */}
        <div className="flex items-center gap-x-2">
          <h3 className="text-2xl font-semibold">User Name</h3>
          <FiEdit size={14} className="cursor-pointer" />
        </div>
        {/* email */}
        <div className="flex items-center gap-x-2 mt-2">
          <p className="">test@test.com</p>
          <FiEdit size={14} className="cursor-pointer" />
        </div>
        {/* password */}
        <button className="bg2 content1 px-4 py-1.5 rounded text-sm mt-20">
          Update Password
        </button>
      </div>

      {/* graph */}
      <div className="flex w-2/5 h-full mb-2 pt-12">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="count" fill="#e36263" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatOverView = () => {
  return (
    <div className="flex gap-x-4">
      {/* book */}
      <div className="flex flex-col items-center justify-center h-40 rounded-full bg2 shadow-lg w-24">
        <FiBookOpen size={20} />
        <p className="text-2xl font-semibold my-2">36</p>
        <p className="text-sm font-thin content2">Books</p>
      </div>

      {/* author */}
      <div className="flex flex-col items-center justify-center h-40 rounded-full bg2 shadow-lg w-24">
        <FiPenTool size={20} />
        <p className="text-2xl font-semibold my-2">21</p>
        <p className="text-sm font-thin content2">Authors</p>
      </div>

      {/* streak */}
      <div className="flex flex-col items-center justify-center h-40 rounded-full bg2 shadow-lg w-24">
        <AiOutlineFire size={20} />
        <p className="text-2xl font-semibold my-2">16d</p>
        <p className="text-sm font-thin content2">Streak</p>
      </div>
    </div>
  );
};

const GenreStat = () => {
  return (
    <section>
      <h3 className=" section-header mb-8">Top Genres</h3>
      <div className="flex w-full">
        <div className="flex flex-col gap-y-2">
          <SingleStat />
          <SingleStat />
          <SingleStat />
          <SingleStat />
          <SingleStat />
        </div>
        <div className="flex-1">
          <PieChartCustom />
        </div>
      </div>
    </section>
  );
};

const RecentReads = () => {
  return (
    <section>
      <div className="flex items-center justify-between gap-x-8 w-full mt-16">
        <h2 className="section-header mb-8">Recent Reads</h2>
        <PrevNext />
      </div>
      <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
        <BookFlip width={140} details={true} audio={false} />
        <BookFlip width={140} details={true} audio={false} />
        <BookFlip width={140} details={true} audio={false} />
      </div>
    </section>
  );
};

const monthlyData = [
  {
    month: "Jan",
    count: 3,
  },
  {
    month: "Feb",
    count: 1,
  },
  {
    month: "Mar",
    count: 5,
  },
  {
    month: "Apr",
    count: 1,
  },
  {
    month: "May",
    count: 3,
  },
  {
    month: "Jun",
    count: 3,
  },
  {
    month: "Jul",
    count: 0,
  },
  {
    month: "Aug",
    count: 6,
  },
  {
    month: "Sep",
    count: 3,
  },
  {
    month: "Oct",
    count: 4,
  },
  {
    month: "Nov",
    count: 9,
  },
  {
    month: "Dec",
    count: 1,
  },
];
