import { RULER_PADDING_X } from "./constants";
import { useTimelineStore } from "./hooks";
import { timeToPixel } from "./utils";

export const Playhead = () => {
  const playheadTime = useTimelineStore((state) => state.playheadTime);
  const horizontalScroll = useTimelineStore((state) => state.horizontalScroll);
  const playheadContainerWidth = useTimelineStore((state) => state.playheadContainerWidth);

  const positionX = timeToPixel(playheadTime) - horizontalScroll;

  const isHidden = positionX < -1 * RULER_PADDING_X || positionX > playheadContainerWidth + RULER_PADDING_X;

  return (
    <div
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10"
      data-testid="playhead"
      style={{ transform: `translateX(calc(${positionX}px - 50%))` }}
      hidden={isHidden}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};
