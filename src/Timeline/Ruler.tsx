import { useRef } from "react";
import clamp from "lodash/clamp";
import { getAtomTime, timeToPixel, pixelToTime } from "./utils";
import { useDraggable, useTimelineStore } from "./hooks";

export const Ruler = () => {
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
        handleChangeTime(event.pageX - baseX);
      },
      onDragMove: (_startEvent, cntEvent, _prevEvent, getContext) => {
        handleChangeTime(cntEvent.pageX - getContext().baseX);
      },
      onDragEnd: (event, getContext) => {
        handleChangeTime(event.pageX - getContext().baseX);
      },
    }
  );

  return (
    <div
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
    >
      <div
        className="h-6 rounded-md bg-white/25"
        style={{ width: timeToPixel(duration) }}
        data-testid="ruler-bar"
        ref={draggableRef}
      />
    </div>
  );
};
