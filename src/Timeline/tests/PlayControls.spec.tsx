import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayControls } from "../components/PlayControls";
import { useTimelineStore } from "../hooks";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("PlayControls", () => {
  const Wrapper = () => {
    const playheadTime = useTimelineStore((state) => state.playheadTime);
    const duration = useTimelineStore((state) => state.duration);

    return (
      <div>
        <span role="playheadTime">{playheadTime}</span>
        <span role="duration">{duration}</span>
        <PlayControls />
      </div>
    );
  };

  const setup = () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    const currentElem = screen.getByTestId("current-time-input") as HTMLInputElement;
    const durationElem = screen.getByTestId("duration-input") as HTMLInputElement;

    return { user, currentElem, durationElem };
  };

  it("Current Time is always between `0ms` and the Duration", async () => {
    const { user, currentElem, durationElem } = setup();
    const duration = durationElem.valueAsNumber;

    await user.click(currentElem);
    await delay(20);
    await user.keyboard("-1000");
    await user.click(document.body);
    expect(currentElem.value).toBe("0");

    await user.click(currentElem);
    await delay(20);
    await user.keyboard(`${duration + 1000}`);
    await user.click(document.body);
    expect(currentElem.value).toBe(duration.toString());
  });

  it("Current Time adjusts if it exceeds the newly set Duration", async () => {
    const { user, currentElem, durationElem } = setup();

    const cntTime = 800;
    const duration = 700;

    await user.click(currentElem);
    await delay(15);
    await user.keyboard(cntTime.toString());
    await user.click(document.body);
    expect(currentElem.value).toBe(cntTime.toString());

    await user.click(durationElem);
    await delay(15);
    await user.keyboard(duration.toString());
    await user.click(document.body);
    expect(currentElem.value).toBe(duration.toString());
  });

  it("Duration is always between `100ms` and `6000ms`", async () => {
    const { user, durationElem } = setup();

    await user.click(durationElem);
    await delay(15);
    await user.keyboard("50");
    await user.click(document.body);
    expect(durationElem.value).toBe("100");

    await user.click(durationElem);
    await delay(15);
    await user.keyboard("7000");
    await user.click(document.body);
    expect(durationElem.value).toBe("6000");
  });

  it("Current Time and Duration are always multiples of `10ms`", async () => {
    const { user, currentElem, durationElem } = setup();

    for (let i = 0; i < 10; i++) {
      const randTenNum = Math.floor(Math.random() * 100) * 10 + 100;
      const randModNum = Math.floor(Math.random() * 5);

      await user.click(durationElem);
      await delay(15);
      await user.keyboard(`${randTenNum + randModNum}`);
      await user.click(document.body);
      expect(durationElem.value).toBe(`${randTenNum}`);
    }

    await user.click(durationElem);
    await delay(15);
    await user.keyboard(`6000`);
    await user.click(document.body);

    for (let i = 0; i < 10; i++) {
      const randTenNum = Math.floor(Math.random() * 600) * 10;
      const randModNum = Math.floor(Math.random() * 5);

      await user.click(currentElem);
      await delay(15);
      await user.keyboard(`${randTenNum + randModNum}`);
      await user.click(document.body);
      expect(currentElem.value).toBe(`${randTenNum}`);
    }
  });
});
