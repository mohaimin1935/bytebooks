"use client";

import BookFlip from "@/app/ui/book/cards/BookFlip";
import Carousel from "@/app/ui/common/Carousel";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Calender from "@/app/ui/reader/Calendar";
import CollectionCard from "@/app/ui/book/cards/CollectionCard";
import AuthorCard from "@/app/ui/author/AuthorCard";
import NotificationCard from "@/app/ui/common/NotificationCard";
import useSWR from "swr";
import { fetcher } from "@/utils/util";
import Loader from "@/app/ui/common/Loader";
import Link from "next/link";

const ReaderHome = () => {
  const { data } = useSession();

  const { data: continueBooks, isLoading: continueLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=continue`,
    fetcher
  );

  const { data: recommendedBooks, isLoading: recommendedLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=recommended`,
    fetcher
  );

  const { data: notifications, isLoading: notificationLoading } = useSWR(
    `/api/users/${data?.user?.id}/notifications`,
    fetcher
  );

  return (
    <div className="flex flex-col xl:flex-row gap-8 md:gap-16">
      <div className="order-1 xl:order-2 w-full xl:w-2/5">
        {/* right | top */}
        <ContinueCarouselSection
          isLoading={continueLoading}
          books={continueBooks}
        />
        <CalenderSection />
        {/* <AuthorSection /> */}
        <NotificationSection
          notifications={notifications?.slice(0, 5)}
          isLoading={notificationLoading}
        />
      </div>

      <div className="order-2 xl:order-1 w-full xl:w-3/5">
        {/* left | bottom */}
        <WelcomeSection user={data?.user} />
        <RecommendationSection
          isLoading={recommendedLoading}
          books={recommendedBooks?.slice(0, 3)}
        />
        {/* <CollectionSection /> */}
      </div>
    </div>
  );
};

const ContinueCarouselSection = ({ isLoading, books = [] }) => {
  return (
    <section>
      <h3 className="section-header">Continue</h3>
      {!isLoading ? (
        <>
          {books?.length > 1 && (
            <Carousel className={"w-[240px] my-4"}>
              {books?.map((book) => (
                <BookFlip
                  book={book}
                  audio={true}
                  details={true}
                  ratio={1.3}
                  key={book.id}
                />
              ))}
            </Carousel>
          )}
          {books.length === 1 && (
            <div className="w-[240px]">
              <BookFlip
                book={books[0]}
                audio={true}
                details={true}
                ratio={1.3}
                key={books[0].id}
              />
            </div>
          )}
          {books.length === 0 && (
            <div className="h-[240px] center">No book to continue</div>
          )}
        </>
      ) : (
        <div className="animate-pulse w-[240px] h-[320px] bg2 rounded-md my-4 center">
          <Loader />
        </div>
      )}
    </section>
  );
};

const CalenderSection = () => {
  return (
    <section className="mt-12 hidden sm:block">
      <Calender />
    </section>
  );
};

const AuthorSection = () => {
  return (
    <section className="my-12">
      <h3 className="section-header mb-8">Author of the day</h3>
      <AuthorCard author={{ name: "Test", desc: "Test description" }} />
    </section>
  );
};

const NotificationSection = ({ notifications, isLoading }) => {
  if (isLoading) return <Loader className="h-24" />;

  return (
    <section>
      <div className="flex items-center gap-x-8 w-full mt-16 mb-8">
        <h2 className="section-header">Notifications</h2>
        {/* <button className="bg1 py-1.5 px-4 secondary-btn text-sm sm:text-base">
          Clear All
        </button> */}
      </div>
      {notifications?.length > 0 ? (
        notifications?.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      ) : (
        <>No new notification</>
      )}
    </section>
  );
};

const WelcomeSection = ({ user }) => {
  const { data: userData } = useSWR(`/api/users/${user?.id}`, fetcher);
  return (
    <section className="hidden xl:block">
      <div className="flex flex-col gap-y-2 capitalize font-semibold">
        <h2 className="text-xl sm:text-2xl md:text-3xl">Happy Reading,</h2>
        <h2 className="text-2xl sm:text-3xl md:text-4xl">
          {userData?.name || "User"}
        </h2>
      </div>
      <p className="my-8 w-full md:w-2/3">
        Welcome to our book sanctuary! Explore captivating stories and diverse
        genres. Immerse yourself in a world of literary delights.
      </p>
      <Link href="/reader/explore" className="primary-btn py-2 px-8">
        Explore
      </Link>
    </section>
  );
};

const RecommendationSection = ({ books, isLoading }) => {
  return (
    <section>
      <div className="flex items-center gap-x-8 w-full mt-16 mb-8">
        <h2 className="section-header">Recommended</h2>
      </div>
      <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
        {isLoading ? (
          <Loader className="h-64" />
        ) : (
          <>
            {books?.map((book) => (
              <BookFlip
                width={180}
                details={true}
                audio={false}
                book={book}
                key={book.id}
                ratio={1.4}
                className={""}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

const CollectionSection = () => {
  return (
    <section>
      <div className="flex items-center gap-x-8 w-full mt-16 mb-8">
        <h2 className="section-header">collections for you</h2>
      </div>
      <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
    </section>
  );
};

export default ReaderHome;
