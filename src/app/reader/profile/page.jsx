import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import PieChartCustom from "@/app/ui/common/charts/PieChartCustom";
import Bookshelf from "@/app/ui/reader/Bookshelf";
import React from "react";
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

const ReaderProfile = () => {
  return (
    <div>
      <Bookshelf />
      <GenreStat />
    </div>
  );
};

const GenreStat = () => {
  return (
    <section className="mt-24 flex w-full">
      <div className="w-1/3 flex items-center flex-col text-center ">
        <h2 className="section-header">Top Genres</h2>
        <PieChartCustom />
      </div>
      <div className="w-2/3">
        <section>
          <div className="flex items-start justify-between gap-x-8 w-full">
            <h2 className="section-header mb-8">Recent Reads</h2>
            <PrevNext />
          </div>
          <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
            <BookFlip width={140} details={true} audio={true} />
            <BookFlip width={140} details={true} audio={true} />
            <BookFlip width={140} details={true} audio={true} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default ReaderProfile;

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
