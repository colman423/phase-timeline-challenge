import { useTimelineStore } from "./hooks";
import { timeToPixel } from "./utils";

export const Segment = () => {
  const duration = useTimelineStore((state) => state.duration);

  return (
    <div className="py-2" data-testid="segment" style={{ width: timeToPixel(duration) }}>
      <div className="h-6 rounded-md bg-gradient-to-r from-red-500 to-blue-500"></div>
    </div>
  );
};
