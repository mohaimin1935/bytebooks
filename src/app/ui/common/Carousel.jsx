"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cn } from "@/utils/cn";

const Carousel = ({ children, className }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className={cn("", className)}>
      <Slider {...settings} className="bg1 relative">
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;
