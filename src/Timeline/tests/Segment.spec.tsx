import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Segment } from "../components/Segment";
import { useTimelineStore } from "../hooks";

describe("Segment", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<Segment />);
    const SegmentElem = screen.getByTestId("segment") as HTMLDivElement;

    return { user, SegmentElem };
  };

  it("Segment length visually represents the total Duration (`1ms = 1px`)", async () => {
    const { SegmentElem } = setup();

    for (let i = 0; i < 10; i++) {
      const duration = Math.floor(Math.random() * 500) * 10 + 1000;

      act(() => {
        useTimelineStore.setState({ duration });
      });

      expect(SegmentElem.style.width).toBe(`${duration}px`);
    }
  });
});
