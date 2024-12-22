import React from "react";
import { useTimelineStore } from "./hooks";
import { MAX_DURATION } from "./constants";

export const PlayControls = () => {
  const playheadTime = useTimelineStore((state) => state.playheadTime);
  const updatePlayheadTime = useTimelineStore(
    (state) => state.updatePlayheadTime
  );
  const duration = useTimelineStore((state) => state.duration);
  const updateDuration = useTimelineStore((state) => state.updateDuration);

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePlayheadTime(Number(e.target.value));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDuration(Number(e.target.value));
  };

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="current-time-input"
          min={0}
          max={2000}
          step={10}
          value={playheadTime}
          onChange={onTimeChange}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="duration-input"
          min={100}
          max={MAX_DURATION}
          step={10}
          value={duration}
          onChange={handleDurationChange}
        />
        Duration
      </fieldset>
    </div>
  );
};
