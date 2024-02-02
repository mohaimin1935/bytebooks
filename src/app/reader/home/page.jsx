"use client";

import BookFlip from "@/app/ui/book/cards/BookFlip";
import Carousel from "@/app/ui/common/Carousel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Calender from "@/app/ui/reader/Calendar";
import CollectionCard from "@/app/ui/book/cards/CollectionCard";
import AuthorCard from "@/app/ui/author/AuthorCard";
import NotificationCard from "@/app/ui/common/NotificationCard";

const ReaderHome = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-col xl:flex-row gap-8 md:gap-16">
      <div className="order-1 xl:order-2 w-full xl:w-2/5">
        {/* right | top */}
        <ContinueCarouselSection />
        <CalenderSection />
        <AuthorSection />
        <NotificationSection />
      </div>

      <div className="order-2 xl:order-1 w-full xl:w-3/5">
        {/* left | bottom */}
        <WelcomeSection user={data?.user} />
        <RecommendationSection />
        <CollectionSection />
      </div>
    </div>
  );
};

const ContinueCarouselSection = () => {
  return (
    <section>
      <h3 className="section-header">Continue</h3>
      <Carousel
        className={"w-[240px] my-4"}
        items={[
          () => <BookFlip audio={true} details={true} ratio={1.6} />,
          () => <BookFlip audio={true} details={true} ratio={1.6} />,
          () => <BookFlip audio={true} details={true} ratio={1.6} />,
          () => <BookFlip audio={true} details={true} ratio={1.6} />,
        ]}
      />
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

const NotificationSection = () => {
  return (
    <section>
      <div className="flex items-center gap-x-8 w-full mt-16 mb-8">
        <h2 className="section-header">Notifications</h2>
        <button className="bg1 py-1.5 px-4 secondary-btn text-sm sm:text-base">
          Clear All
        </button>
      </div>
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </section>
  );
};

const WelcomeSection = ({ user }) => {
  return (
    <section className="hidden xl:block">
      <div className="flex flex-col gap-y-2 capitalize font-semibold">
        <h2 className="text-xl sm:text-2xl md:text-3xl">Happy Reading,</h2>
        <h2 className="text-2xl sm:text-3xl md:text-4xl">
          {user?.name || "User"}
        </h2>
      </div>
      <p className="my-8 w-full md:w-2/3">
        Welcome to our book sanctuary! Explore captivating stories and diverse
        genres. Immerse yourself in a world of literary delights.
      </p>
      <button className="primary-btn py-2 px-8">Explore</button>
    </section>
  );
};

const RecommendationSection = () => {
  return (
    <section>
      <div className="flex items-center gap-x-8 w-full mt-16 mb-8">
        <h2 className="section-header">Recommended</h2>
        <button className="bg1 py-1.5 px-4 secondary-btn text-sm sm:text-base">
          View All
        </button>
      </div>
      <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
        <BookFlip width={140} details={true} audio={false} />
        <BookFlip width={140} details={true} audio={false} />
        <BookFlip width={140} details={true} audio={false} />
      </div>
    </section>
  );
};

const CollectionSection = () => {
  return (
    <section>
      <div className="flex items-center gap-x-8 w-full mt-16 mb-8">
        <h2 className="section-header">collections for you</h2>
        <button className="bg1 py-1.5 px-4 secondary-btn text-sm sm:text-base">
          View All
        </button>
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
