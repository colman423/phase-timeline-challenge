import { render, screen, act } from "@testing-library/react";
import { useTimelineStore } from "../hooks";
import { Timeline } from "../components/Timeline";

describe("Scroll", () => {
  it("Render initial", () => {
    render(<Timeline />);
    const KeyframeList = screen.getByTestId("keyframe-list");
    const Ruler = screen.getByTestId("ruler");
    const TrackList = screen.getByTestId("track-list");

    expect(Ruler.scrollLeft).toBe(0);
    expect(KeyframeList.scrollLeft).toBe(0);
    expect(KeyframeList.scrollTop).toBe(0);
    expect(TrackList.scrollTop).toBe(0);
  });

  it("Horizontal scrolling", () => {
    render(<Timeline />);

    for (let i = 0; i < 10; i++) {
      const horizontalScroll = Math.random() * 1000;
      act(() => {
        useTimelineStore.setState({ horizontalScroll });
      });

      const KeyframeList = screen.getByTestId("keyframe-list");
      const Ruler = screen.getByTestId("ruler");
      const Playhead = screen.getByTestId("playhead");

      expect(Ruler.scrollLeft).toBe(horizontalScroll);
      expect(KeyframeList.scrollLeft).toBe(horizontalScroll);
      expect(Playhead).toHaveStyle({ transform: `translateX(calc(-${horizontalScroll}px - 50%))` });
    }
  });

  it("Vertical scrolling", () => {
    render(<Timeline />);

    for (let i = 0; i < 10; i++) {
      const verticalScroll = Math.random() * 1000;
      act(() => {
        useTimelineStore.setState({ verticalScroll });
      });

      const KeyframeList = screen.getByTestId("keyframe-list");
      const TrackList = screen.getByTestId("track-list");

      expect(KeyframeList.scrollTop).toBe(verticalScroll);
      expect(TrackList.scrollTop).toBe(verticalScroll);
    }
  });
});
