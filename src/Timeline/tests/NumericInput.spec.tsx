import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumericInput from "../components/NumericInput";
import { useState } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("NumericInput", () => {
  const Wrapper = (props: Partial<Parameters<typeof NumericInput>[0]>) => {
    const [value, setValue] = useState(0);
    return (
      <div>
        <span role="value">{value}</span>
        <NumericInput value={value} onChange={setValue} min={0} max={1000} role="textbox" {...props} />
      </div>
    );
  };

  const setup = () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    const spanElement = screen.getByRole("value") as HTMLSpanElement;

    return { user, inputElement, spanElement };
  };

  it("The displayed value updates immediately while typing, but `onChange` is not triggered until input is confirmed", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<NumericInput value={0} onChange={onChange} min={0} max={1000} role="textbox" />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;

    await user.click(inputElement);
    await delay(15);

    await user.keyboard("13");
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(13);
  });

  it("The displayed value updates immediately while typing, but `onChange` is not triggered until input is confirmed", async () => {
    const { user, inputElement, spanElement } = setup();
    const randomNum = Math.floor(Math.random() * 1000);

    await user.click(inputElement);
    await delay(15);

    await user.keyboard(randomNum.toString());
    expect(spanElement.innerHTML).toBe("0");
    expect(inputElement.value).toBe(randomNum.toString());

    await user.keyboard("{Enter}");
    expect(spanElement.innerHTML).toBe(randomNum.toString());
    expect(inputElement.value).toBe(randomNum.toString());
  });

  it("Clicking outside the input field removes focus and changes the value", async () => {
    const { user, inputElement, spanElement } = setup();
    const randomNum = Math.floor(Math.random() * 1000);

    await user.click(inputElement);
    await delay(15);

    await user.keyboard(randomNum.toString());
    expect(spanElement.innerHTML).toBe("0");

    await user.click(document.body);
    expect(spanElement.innerHTML).toBe(randomNum.toString());
  });

  it("Entire text is selected when the input field gains focus", async () => {
    const { user, inputElement } = setup();

    inputElement.type = "text";

    await user.click(inputElement);
    await delay(15);

    expect(inputElement.selectionStart).toBe(0);
    expect(inputElement.selectionEnd).toBe(1);
  });

  it("Pressing Enter confirms the new value and removes focus", async () => {
    const { user, inputElement, spanElement } = setup();
    const randomNum = Math.floor(Math.random() * 1000);

    await user.click(inputElement);
    await delay(15);

    await user.keyboard(randomNum.toString());
    expect(spanElement.innerHTML).toBe("0");
    expect(inputElement.value).toBe(randomNum.toString());

    await user.keyboard("{Enter}");
    expect(spanElement.innerHTML).toBe(randomNum.toString());
    expect(inputElement.value).toBe(randomNum.toString());
  });

  it("Pressing Escape reverts to the original value and removes focus", async () => {
    const { user, inputElement, spanElement } = setup();
    const randomNum = Math.floor(Math.random() * 1000);

    await user.click(inputElement);
    await delay(15);

    await user.keyboard(randomNum.toString());
    expect(spanElement.innerHTML).toBe("0");
    expect(inputElement.value).toBe(randomNum.toString());

    await user.keyboard("{Escape}");
    expect(spanElement.innerHTML).toBe("0");
    expect(inputElement.value).toBe("0");
  });

  it("Leading zeros are automatically removed", async () => {
    const { user, inputElement, spanElement } = setup();
    const randomNum = Math.floor(Math.random() * 1000);

    await user.click(inputElement);
    await delay(15);

    await user.keyboard(`00${randomNum}`);
    await user.keyboard("{Enter}");
    expect(spanElement.innerHTML).toBe(randomNum.toString());
    expect(inputElement.value).toBe(randomNum.toString());
  });

  it("Invalid inputs (non-numeric) revert to the previous valid value", async () => {
    const { user, inputElement } = setup();

    await user.click(inputElement);
    await delay(15);

    await user.keyboard("1a2b3c4d5");
    expect(inputElement.value).toBe("12345");
  });
});
