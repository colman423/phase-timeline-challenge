import { useRef } from "react";
import { useDraggable } from "./utils/useDraggable";
import clamp from "lodash/clamp";

type RulerProps = {
  setTime: (time: number) => void;
};

export const Ruler = ({ setTime }: RulerProps) => {
  const draggableRef = useRef<HTMLDivElement>(null);

  const handleChangeTime = (time: number) => {
    const transformedTime = clamp(Math.floor(time / 10) * 10, 0, 2000); // TODO: duration
    setTime(transformedTime);
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
        className="w-[2000px] h-6 rounded-md bg-white/25"
        data-testid="ruler-bar"
        ref={draggableRef}
      />
    </div>
  );
};
