import { useRef } from "react";
import clamp from "lodash/clamp";
import { getAtomTime, timeToPixel, pixelToTime } from "../utils";
import { useDraggable, useGlobalHorizontalScroll, useTimelineStore, useScalable } from "../hooks";
import { RULER_PADDING_X } from "../constants";

export const Ruler = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useGlobalHorizontalScroll(scrollRef);

  const updatePlayheadContainerWidth = useTimelineStore((state) => state.updatePlayheadContainerWidth);
  useScalable(scrollRef, ({ width }) => updatePlayheadContainerWidth(width));

  const duration = useTimelineStore((state) => state.duration);
  const updatePlayheadTime = useTimelineStore((state) => state.updatePlayheadTime);
  const draggableRef = useRef<HTMLDivElement>(null);

  const handleChangeTime = (pixelLeft: number) => {
    const transformedTime = clamp(getAtomTime(pixelToTime(pixelLeft)), 0, duration);
    updatePlayheadTime(transformedTime);
  };

  useDraggable(
    draggableRef,
    { baseX: -1 },
    {
      onDragStart: (event, _getContext, setContext) => {
        const baseX = draggableRef.current!.getBoundingClientRect().left;
        setContext({ baseX: baseX });
        handleChangeTime(event.clientX - baseX);
      },
      onDragMove: (_startEvent, cntEvent, _prevEvent, getContext) => {
        handleChangeTime(cntEvent.clientX - getContext().baseX);
      },
      onDragEnd: (event, getContext) => {
        handleChangeTime(event.clientX - getContext().baseX);
      },
    }
  );

  return (
    <div
      className="py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
      style={{ paddingLeft: RULER_PADDING_X, paddingRight: RULER_PADDING_X }}
      ref={scrollRef}
    >
      <div
        className="h-6 rounded-md bg-gradient-to-r from-red-500 to-blue-500"
        style={{ width: timeToPixel(duration) }}
        data-testid="ruler-bar"
        ref={draggableRef}
      />
    </div>
  );
};
