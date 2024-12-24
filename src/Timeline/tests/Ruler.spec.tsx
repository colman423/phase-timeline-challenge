import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Ruler } from "../components/Ruler";
import { useTimelineStore } from "../hooks";

describe("Ruler", () => {
  const Wrapper = () => {
    const playheadTime = useTimelineStore((state) => state.playheadTime);

    return (
      <div>
        <span role="playheadTime">{playheadTime}</span>
        <Ruler />
      </div>
    );
  };

  const setup = () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    const RulerBarElem = screen.getByTestId("ruler-bar") as HTMLDivElement;
    const getCurrentTime = () => parseInt(screen.getByRole("playheadTime").textContent!);

    return { user, RulerBarElem, getCurrentTime };
  };

  it("Clicking or dragging on the Ruler updates the Current Time and Playhead position", async () => {
    const { RulerBarElem, getCurrentTime } = setup();

    fireEvent.mouseDown(RulerBarElem, { clientX: 100 });
    expect(getCurrentTime()).toBe(100);

    fireEvent.mouseMove(RulerBarElem, { clientX: 150 });
    expect(getCurrentTime()).toBe(150);

    fireEvent.mouseUp(RulerBarElem, { clientX: 230 });
    expect(getCurrentTime()).toBe(230);
  });

  it("Ruler length visually represents the total Duration (`1ms = 1px`)", async () => {
    const { RulerBarElem } = setup();

    for (let i = 0; i < 10; i++) {
      const duration = Math.floor(Math.random() * 500) * 10 + 1000;

      act(() => {
        useTimelineStore.setState({ duration });
      });

      expect(RulerBarElem.style.width).toBe(`${duration}px`);
    }
  });
});
