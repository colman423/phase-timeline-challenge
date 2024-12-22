import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";
import { useTimelineStore } from "./hooks";

export const Timeline = () => {
  const playheadTime = useTimelineStore((state) => state.playheadTime);
  const updatePlayheadTime = useTimelineStore((state) => state.updatePlayheadTime);

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
    >
      <PlayControls time={playheadTime} setTime={updatePlayheadTime} />
      <Ruler />
      <TrackList />
      <KeyframeList />
      <Playhead time={playheadTime} />
    </div>
  );
};
