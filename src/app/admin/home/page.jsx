"use client";

import ReportCard from "@/app/ui/admin/ReportCard";
import BookEditSkeleton from "@/app/ui/book/BookEditSkeleton";
import { fetcher } from "@/utils/util";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import useSWR from "swr";

const AdminHome = () => {
  const { data: pendingReports, isLoading: pendingLoading } = useSWR(
    "/api/report?isPending=true",
    fetcher,
    { refreshInterval: 200 }
  );
  const { data: todayResolvedReports, isLoading: resolvedLoading } = useSWR(
    "/api/report?isToday=true&isPending=false",
    fetcher,
    { refreshInterval: 200 }
  );

  console.log(pendingReports);
  console.log(todayResolvedReports);

  return (
    <div className="flex gap-12 relative">
      {/* IN PROGRESS */}
      <div className="w-1/2 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-amber-500"></div>
        <div className="px-8 pb-8">
          <h3 className="text-xl font-semibold text-center my-4">
            Pending Reports
          </h3>

          {/* REPORT CARD */}
          {pendingLoading ? (
            <>
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
            </>
          ) : (
            pendingReports?.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))
          )}
        </div>
      </div>

      {/* RESOLVED TODAY */}
      <div className="w-1/2 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-emerald-500"></div>
        <div className="px-8 pb-8">
          <h3 className="text-xl font-semibold text-center my-4">
            Resolved Today
          </h3>

          {/* REPORT CARD */}
          {resolvedLoading ? (
            <>
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
            </>
          ) : (
            todayResolvedReports?.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
