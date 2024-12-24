import { render, screen, act } from "@testing-library/react";
import { Playhead } from "../components/Playhead";
import { RULER_PADDING_X } from "../constants";
import { useTimelineStore } from "../hooks";

describe("Playhead", () => {
  it("Render Playhead", () => {
    render(<Playhead />);
    const playheadElement = screen.getByTestId("playhead");

    expect(playheadElement).toHaveStyle({
      left: `${300 + RULER_PADDING_X}px`,
      transform: "translateX(calc(0px - 50%))",
      visibility: "visible",
    });
  });

  it("Playhead moves in sync with the Ruler and Keyframe List during horizontal scrolling", () => {
    render(<Playhead />);
    const playheadElement = screen.getByTestId("playhead");

    for (let i = 0; i < 10; i++) {
      const horizontalScroll = Math.random() * 1000;
      const playheadTime = Math.floor(Math.random() * 100) * 10;

      act(() => {
        useTimelineStore.setState({ horizontalScroll: horizontalScroll, playheadTime: playheadTime });
      });

      expect(playheadElement).toHaveStyle({
        left: `${300 + RULER_PADDING_X}px`,
        transform: `translateX(calc(${playheadTime - horizontalScroll}px - 50%))`,
      });
    }
  });

  it("Playhead is visible only when within the Timeline's visible area, using the `hidden` attribute when completely out of view", async () => {
    render(<Playhead />);
    const playheadElement = screen.getByTestId("playhead");

    act(() => {
      useTimelineStore.setState({ playheadContainerWidth: 1000 });
    });

    const data = [
      { playheadTime: 0, horizontalScroll: 0, visible: true },
      { playheadTime: 800, horizontalScroll: 0, visible: true },
      { playheadTime: 2200, horizontalScroll: 0, visible: false },
      { playheadTime: 3000, horizontalScroll: 0, visible: false },
      { playheadTime: 0, horizontalScroll: 800, visible: false },
      { playheadTime: 800, horizontalScroll: 800, visible: true },
      { playheadTime: 2200, horizontalScroll: 800, visible: false },
      { playheadTime: 3000, horizontalScroll: 800, visible: false },
      { playheadTime: 0, horizontalScroll: 2200, visible: false },
      { playheadTime: 800, horizontalScroll: 2200, visible: false },
      { playheadTime: 2200, horizontalScroll: 2200, visible: true },
      { playheadTime: 3000, horizontalScroll: 2200, visible: true },
      { playheadTime: 0, horizontalScroll: 3000, visible: false },
      { playheadTime: 800, horizontalScroll: 3000, visible: false },
      { playheadTime: 2200, horizontalScroll: 3000, visible: false },
      { playheadTime: 3000, horizontalScroll: 3000, visible: true },
    ];

    for (const { playheadTime, horizontalScroll, visible } of data) {
      act(() => {
        useTimelineStore.setState({ playheadTime, horizontalScroll });
      });
      if (visible) {
        expect(playheadElement).not.toHaveAttribute("hidden");
      } else {
        expect(playheadElement).toHaveAttribute("hidden");
      }
    }
  });
});
