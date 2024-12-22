import { useTimelineStore } from "./hooks";
import { ATOM_UNIT, MAX_DURATION, MIN_DURATION } from "./constants";
import NumericInput from "./NumericInput";
import clamp from "lodash/clamp";
import { getAtomTime } from "./utils";

export const PlayControls = () => {
  const playheadTime = useTimelineStore((state) => state.playheadTime);
  const updatePlayheadTime = useTimelineStore((state) => state.updatePlayheadTime);
  const duration = useTimelineStore((state) => state.duration);
  const updateDuration = useTimelineStore((state) => state.updateDuration);

  const handleSubmitPlayheadTime = (value: number) => {
    updatePlayheadTime(clamp(getAtomTime(value), 0, duration));
  };

  const handleSubmitDuration = (value: number) => {
    updateDuration(clamp(getAtomTime(value), MIN_DURATION, MAX_DURATION));
  };

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <NumericInput
          className="bg-gray-700 px-1 rounded"
          data-testid="current-time-input"
          min={0}
          max={2000}
          step={ATOM_UNIT}
          value={playheadTime}
          onSubmit={handleSubmitPlayheadTime}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <NumericInput
          className="bg-gray-700 px-1 rounded"
          data-testid="duration-input"
          min={MIN_DURATION}
          max={MAX_DURATION}
          step={ATOM_UNIT}
          value={duration}
          onSubmit={handleSubmitDuration}
        />
        Duration
      </fieldset>
    </div>
  );
};
