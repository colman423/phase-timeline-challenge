import { useRef } from "react";
import { Segment } from "./Segment";
import { useGlobalHorizontalScroll, useGlobalVerticalScroll } from "../hooks";
import { RULER_PADDING_X } from "../constants";

export const KeyframeList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useGlobalHorizontalScroll(scrollRef);
  useGlobalVerticalScroll(scrollRef);

  return (
    <div
      className="px-4 min-w-0 overflow-auto"
      data-testid="keyframe-list"
      ref={scrollRef}
      style={{ paddingLeft: RULER_PADDING_X, paddingRight: RULER_PADDING_X }}
    >
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
    </div>
  );
};
