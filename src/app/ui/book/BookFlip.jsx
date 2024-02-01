import React from "react";

const BookFlip = () => {
  return (
    <div class="cover">
      <div class="book" style={{ perspective: "1200px" }}>
        <label for="page-1" class="book__page book__page--1">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/193203/1111.jpg"
            alt=""
          />
        </label>

        <label
          for="page-2"
          class="book__page book__page--4"
          style={{
            transform: "rotate(0deg)",
            transition: "transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1)",
            transformOrigin: "0% 0%",
          }}
        >
          <div class="page__content">page content</div>
        </label>

        <input type="radio" name="page" id="page-1" />

        <input type="radio" name="page" id="page-2" />
        <label class="book__page book__page--2">
          <div class="book__page-front">
            <div class="page__content">ekhane cover</div>
          </div>
          <div class="book__page-back">
            <div class="page__content">
              <h1 class="page__content-title">Contents</h1>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default BookFlip;
