import { useRef } from "react";
import { Segment } from "./Segment";
import { useGlobalScroll } from "./hooks";

export const KeyframeList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useGlobalScroll(scrollRef, { vertical: true, horizontal: true });

  return (
    <div className="px-4 min-w-0 overflow-auto" data-testid="keyframe-list" ref={scrollRef}>
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
