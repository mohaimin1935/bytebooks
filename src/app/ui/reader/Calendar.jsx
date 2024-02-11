"use client";

import { cn } from "@/utils/cn";
import { fetcher, getCurrentWeek } from "@/utils/util";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const Calendar = () => {
  const [loginDates, setLoginDates] = useState([]);

  const currentWeek = getCurrentWeek();
  const { data } = useSession();

  const { data: streaks, isLoading } = useSWR(
    `/api/users/${data?.user?.id}/streak`,
    fetcher
  );

  const streakIncludes = (date) => {
    console.log(loginDates);
    loginDates.forEach((d) => {
      if (parseInt(d) === date) return true;
    });
    return false;
  };

  useEffect(() => {
    if (streaks) {
      setLoginDates(
        streaks?.loginDates
          ?.map((d) => d?.split("-")?.at(2))
          ?.filter((val, idx, arr) => arr.indexOf(val) === idx)
      );
    }
  }, [isLoading]);

  console.log(streaks?.loginDates?.at(0)?.split("-")?.at(2));

  return (
    <div>
      <div className="flex flex-wrap gap-y-4 items-center gap-x-4">
        {currentWeek.map(({ day, date }) => (
          <div
            key={date}
            className={cn(
              "flex flex-col items-center justify-center w-14 pt-4 pb-6 rounded-full bg2 relative",
              new Date().getDate() == date && "shadow-xl border border-check"
            )}
          >
            {streakIncludes(day) && (
              <div className="w-1 h-1 rounded-full bottom-3 accent2 absolute"></div>
            )}
            <p className="">{day.substring(0, 3)}</p>
            <p className="">{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
