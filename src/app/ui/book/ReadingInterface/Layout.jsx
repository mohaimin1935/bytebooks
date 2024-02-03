import React, { useContext } from "react";
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
        <Warmth />
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

  const sizes = [12, 14, 16, 18];

  return (
    <section>
      <p className="mb-2 mt-6">Font Size</p>
      <div className="flex items-center gap-x-2 text-sm pl-4">
        {sizes.map((size) => (
          <div
            onClick={() => setFontSize(size)}
            className={cn(
              "cursor-pointer rounded px-2",
              fontSize === size ? "border border-check" : ""
            )}
            key={size}
          >
            {size}
          </div>
        ))}
      </div>
    </section>
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
  const margins = [0, 40, 80];

  return (
    <section>
      <p className="mb-2 mt-6">Margins</p>
      <div className="flex items-center gap-x-2 text-sm pl-4">
        <div className="px-[1px] w-8 border border-check py-1 rounded flex flex-col gap-y-[2px]">
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>

        <div className="px-[4px] w-8 border-2 border-check py-1 rounded flex flex-col gap-y-[2px]">
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>

        <div className="px-[8px] w-8 border border-check py-1 rounded flex flex-col gap-y-[2px]">
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>
      </div>
    </section>
  );
};

const Alignments = () => {
  return (
    <section>
      <p className="mb-2 mt-6">Alignments</p>
      <div className="flex items-center gap-x-2 text-sm pl-4">
        <div className="px-[4px] w-8 border border-check py-1 rounded flex flex-col gap-y-[2px]">
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>

        <div className="px-[4px] w-8 border-2 border-check py-1 rounded flex flex-col gap-y-[2px]">
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
  return (
    <section>
      <p className="mb-2 mt-6">Spacing</p>
      <div className="flex items-center gap-x-2 text-sm pl-4">
        <div className="px-[4px] w-8 border border-check py-1 rounded flex flex-col gap-y-[1px]">
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>

        <div className="px-[4px] w-8 border-2 border-check py-1 rounded flex flex-col gap-y-[2px]">
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>

        <div className="px-[4px] w-8 border border-check py-1 rounded flex flex-col gap-y-[4px]">
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
          <div className="w-full accent1 h-px"></div>
        </div>
      </div>
    </section>
  );
};

const Warmth = () => {
  return (
    <div className="flex items-center gap-x-4 my-6">
      <p className="">Warmth</p>
      <RangeSlider className="bg1 h-1 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3" />
    </div>
  );
};

export default Layout;
