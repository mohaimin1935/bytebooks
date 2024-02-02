import React from "react";
import RangeSlider from "../../common/RangeSlider";

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

        {/* warmth */}
        <div className="flex items-center gap-x-4 my-6">
          <p className="">Warmth</p>
          <RangeSlider className="bg1 h-1 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3" />
        </div>
      </div>
    </div>
  );
};

const FontFamily = () => {
  return (
    <section>
      <p className="mb-2">Font Family</p>
      <div className="pl-4 flex flex-col gap-y-2">
        <div
          className="flex cursor-pointer items-center gap-x-2 text-sm"
          onClick={() => handleFontFamily("")}
        >
          <div className="w-4 h-4 rounded-full accent1"></div>
          <p className="">Sans Serif</p>
        </div>
        <div
          className="flex cursor-pointer items-center gap-x-2 text-sm"
          onClick={() => handleFontFamily("")}
        >
          <div className="w-4 h-4 rounded-full border-check border-2"></div>
          <p className="">Sans Serif</p>
        </div>
      </div>
    </section>
  );
};

const FontSize = () => {
  return (
    <section>
      <p className="mb-2 mt-6">Font Family</p>
      <div className="flex items-center gap-x-2 text-sm pl-4">
        <div className="cursor-pointer rounded border border-check px-2">
          12
        </div>
        <div className="cursor-pointer rounded px-2">14</div>
        <div className="cursor-pointer rounded px-2">16</div>
      </div>
    </section>
  );
};

const FontWeight = () => {
  <section>
    <p className="mb-2 mt-6">Font Weight</p>
    <div className="flex items-center gap-x-2 text-sm pl-4">
      <div className="cursor-pointer rounded border border-check px-2">300</div>
      <div className="cursor-pointer rounded px-2">400</div>
      <div className="cursor-pointer rounded px-2">500</div>
    </div>
  </section>;
};

const Margins = () => {
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
  </section>;
};

export default Layout;
