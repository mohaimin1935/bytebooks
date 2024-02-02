import { cn } from "@/utils/cn";
import { getCurrentWeek } from "@/utils/util";
import React from "react";

const Calendar = () => {
  const currentWeek = getCurrentWeek();
  console.log(new Date().getDate());

  return (
    <div>
      <div className="flex items-center gap-x-4">
        {currentWeek.map(({ day, date }) => (
          <div
            className={cn(
              "flex flex-col items-center justify-center w-14 pt-4 pb-6 rounded-full bg2 relative",
              new Date().getDate() == date && "shadow-xl border border-check"
            )}
          >
            {Math.random() > 0.5 && (
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
