import { useTimelineStore } from "../hooks";
import { timeToPixel } from "../utils";

export const Segment = () => {
  const duration = useTimelineStore((state) => state.duration);

  return (
    <div className="py-2" data-testid="segment" style={{ width: timeToPixel(duration) }}>
      <div className="h-6 rounded-md bg-white/10"></div>
    </div>
  );
};
