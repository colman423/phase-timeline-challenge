import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { getAtomTime } from "../utils";

type NumericInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "min" | "max"> & {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
};

const NumericInput = ({ value, onChange, ...props }: NumericInputProps) => {
  const [inputStr, setInputStr] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const isInputStrLiterallyValid = useMemo(() => {
    const newNum = Number(inputStr);
    return getAtomTime(newNum) === newNum && newNum <= props.max && newNum >= props.min;
  }, [inputStr]);

  const handleSubmitChanges = (numStr: string) => {
    const newNum = Number(numStr);
    if (isNaN(newNum)) {
      setInputStr(value.toString());
    } else {
      onChange(newNum);
      setInputStr(value.toString()); // NOTE: For prevent cases like 33 => 34 => 32
    }
  };

  const handleSelect = (target: HTMLInputElement) => {
    // WORKAROUND: setTimeout is needed to make sure the selection is applied
    setTimeout(() => target.select(), 10);
  };

  useLayoutEffect(() => {
    setInputStr(value.toString());
  }, [value]);

  return (
    <input
      {...props}
      className={`${props.className ?? ""} ${isInputStrLiterallyValid ? "" : "text-red-500"}`}
      ref={ref}
      type="number"
      value={inputStr}
      onChange={(e) => {
        const isByNativeChange = !("inputType" in e.nativeEvent);

        if (isByNativeChange) {
          handleSubmitChanges(e.target.value);
          e.target.focus();
          handleSelect(e.target);
        } else {
          setInputStr(e.target.value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          (e.target as HTMLElement).blur();
        } else if (e.key === "Escape") {
          setInputStr(value.toString());
          setTimeout(() => (e.target as HTMLElement).blur(), 0);
        }
      }}
      onFocus={(e) => handleSelect(e.target)}
      onBlur={() => handleSubmitChanges(inputStr)}
    />
  );
};

export default NumericInput;
