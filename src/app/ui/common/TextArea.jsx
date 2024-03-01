import { cn } from "@/utils/cn";
import React, { useEffect, useRef } from "react";

const CustomTextArea = ({
  value,
  setValue,
  className,
  placeholder,
  maxLength = 120,
  maxHeight = 400,
}) => {
  const textAreaRef = useRef(null);
  useEffect(() => {
    let height = textAreaRef?.current.scrollHeight;
    if (maxHeight > 0 && height > maxHeight) height = maxHeight;
    textAreaRef.current.style.height = height + "px";
  }, [value]);

  return (
    <div className="relative z-10">
      <textarea
        ref={textAreaRef}
        style={{ whiteSpace: "pre-wrap" }}
        className={cn(
          "resize-none bg1 outline-none content2 my-2 w-full bg-transparent",
          className
        )}
        maxLength={maxLength}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      >
        {value}
      </textarea>
      {maxLength > 0 && (
        <div className="absolute content3 text-sm">
          {value?.length ?? 0} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default CustomTextArea;
