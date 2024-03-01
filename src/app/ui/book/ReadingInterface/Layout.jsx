import React, { useContext, useState } from "react";
import RangeSlider from "../../common/RangeSlider";
import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";

const Layout = () => {
  return (
    <div>
      <div className="">
        <FontFamily />
        <FontSize />
        <FontWeight />
        <Margins />
        <Alignments />
        <Spacing />
        {/* <Theme /> */}
      </div>
    </div>
  );
};

const FontFamily = () => {
  const { fontFamily, setFontFamily } = useContext(BookReadContext);

  const fonts = [
    { name: "Space Mono", property: `"Space Mono", monospace` },
    { name: "Rubik", property: `"Rubik", sans-serif` },
    { name: "Karla", property: `"Karla", sans-serif` },
    { name: "Noto Serif Bengali", property: `"Noto Serif Bengali", serif` },
  ];

  return (
    <section>
      <p className="mb-2">Font Family</p>
      <div className="pl-4 flex flex-col gap-y-2">
        {fonts.map(({ name, property }) => (
          <div
            className="flex cursor-pointer items-center gap-x-2 text-sm"
            style={{ fontFamily: property }}
            onClick={() => setFontFamily(property)}
            key={name}
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                fontFamily === property ? "accent1" : "border-2 border-check"
              )}
            ></div>
            <p className="">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FontSize = () => {
  const { fontSize, setFontSize } = useContext(BookReadContext);

  return (
    <div className="flex items-center gap-x-4 my-6">
      <p className="">Size</p>
      <RangeSlider
        className="bg1 h-1 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3"
        max={32}
        min={8}
        value={fontSize}
        setValue={setFontSize}
      />
    </div>
  );
};

const FontWeight = () => {
  const { fontWeight, setFontWeight } = useContext(BookReadContext);

  const weights = [300, 400, 500, 600];

  return (
    <section>
      <p className="mb-2 mt-6">Font Weight</p>
      <div className="flex items-center gap-x-2 text-sm pl-4">
        {weights.map((weight) => (
          <div
            onClick={() => setFontWeight(weight)}
            className={cn(
              "cursor-pointer rounded px-2",
              fontWeight === weight ? "border border-check" : ""
            )}
            key={weight}
          >
            {weight}
          </div>
        ))}
      </div>
    </section>
  );
};

const Margins = () => {
  const { margins, setMargins } = useContext(BookReadContext);

  return (
    <div className="flex items-center gap-x-4 my-6">
      <p className="">Margins</p>
      <RangeSlider
        className="bg1 h-1 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3"
        max={400}
        min={0}
        value={margins}
        setValue={setMargins}
      />
    </div>
  );
};

const Alignments = () => {
  const { alignments, setAlignments } = useContext(BookReadContext);

  return (
    <section>
      <p className="mb-2 mt-6">Alignments</p>
      <div className="flex items-center gap-x-2 text-sm pl-4">
        <div
          className={cn(
            "px-[4px] w-8 border border-check py-1 rounded flex flex-col gap-y-[2px]",
            alignments === "justify" && "border-2"
          )}
          onClick={() => setAlignments("justify")}
        >
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>

        <div
          className={cn(
            "px-[4px] w-8 border border-check py-1 rounded flex flex-col gap-y-[2px]",
            alignments === "left" && "border-2"
          )}
          onClick={() => setAlignments("left")}
        >
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-3/4 accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-1/2 accent1 h-px"></div>
        </div>

        <div
          className={cn(
            "px-[4px] w-8 border border-check py-1 rounded flex flex-col gap-y-[2px] items-center",
            alignments === "center" && "border-2"
          )}
          onClick={() => setAlignments("center")}
        >
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-3/4 accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-1/2 accent1 h-px"></div>
        </div>

        <div
          className={cn(
            "px-[4px] w-8 border border-check py-1 rounded flex flex-col gap-y-[2px] items-end",
            alignments === "right" && "border-2"
          )}
          onClick={() => setAlignments("right")}
        >
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-3/4 accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-1/2 accent1 h-px"></div>
        </div>
      </div>
    </section>
  );
};

const Spacing = () => {
  const { spacing, setSpacing } = useContext(BookReadContext);

  return (
    <div className="flex items-center gap-x-4 my-6">
      <p className="">Spacing</p>
      <RangeSlider
        className="bg1 h-1 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3"
        max={3.0}
        min={1.2}
        value={spacing}
        setValue={setSpacing}
      />
    </div>
  );
};

const Theme = () => {
  return (
    <div className="flex items-center gap-x-4 my-6">
      <p className="">Theme</p>
    </div>
  );
};

export default Layout;
