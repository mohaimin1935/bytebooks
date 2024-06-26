"use client";

import React from "react";
import PieChartCustom from "../common/charts/PieChartCustom";
import Loader from "../common/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { truncateText } from "@/utils/util";

const GenreAnalytics = ({ data }) => {
  const piChartData = data?.booksPerGenre.map((item) => ({
    name: item.genreName,
    value: item.count,
  }));

  console.log(piChartData);
  let barChartData = [];

  if (data?.ratingsByGenre) {
    const keys = Object.keys(data?.ratingsByGenre);

    keys.forEach((key) => {
      barChartData.push({
        name: data?.ratingsByGenre[key].name,
        rating: data?.ratingsByGenre[key].totalRating,
        count: data?.ratingsByGenre[key].count,
      });
    });
  }

  return (
    <div className="flex items-start min-h-96">
      <div className="w-1/3 px-8 h-full">
        <h3 className="section-header mb-8">Distribution</h3>

        <div className="h-96">
          {piChartData ? (
            <PieChartCustom data={piChartData} />
          ) : (
            <Loader className="h-72" />
          )}
        </div>
      </div>

      <div className="w-2/3 px-8 h-full">
        <h3 className="section-header mb-8">Highest Rated</h3>

        <div className="w-full h-64 flex items-end gap-x-6">
          {barChartData ? (
            <>
              {barChartData.map((item, index) => (
                <div
                  key={index}
                  className="h-full w-16 flex flex-col items-center max-h-full"
                  style={{
                    height: `${(item.rating * 50) / (5 * item.count)}%`,
                  }}
                >
                  <div className="">{item.rating?.toFixed(2)}</div>
                  <div
                    className={`w-16 accent2 h-full flex-1`}
                    style={{}}
                  ></div>
                  <div className="mt-2">{truncateText(item.name, 6)}</div>
                </div>
              ))}
            </>
          ) : (
            <Loader className="h-72" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreAnalytics;
