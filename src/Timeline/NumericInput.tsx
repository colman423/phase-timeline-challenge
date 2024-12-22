import { useEffect, useRef, useState } from "react";

type NumericInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onSubmit"> & {
  value: number;
  onSubmit: (value: number) => void;
};

const NumericInput = ({ value, onSubmit, ...props }: NumericInputProps) => {
  const [inputStr, setInputStr] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputStr(value.toString());
  }, [value]);

  return (
    <input
      {...props}
      ref={ref}
      type="number"
      value={inputStr}
      onChange={(e) => {
        const isByNativeChange = !("inputType" in e.nativeEvent);

        if (isByNativeChange) {
          const newNum = Number(e.target.value);
          if (isNaN(newNum)) {
            setInputStr(value.toString());
          } else {
            onSubmit(newNum);
            e.target.focus();
            setTimeout(() => e.target.select(), 10);
          }
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
      onFocus={(e) => {
        setTimeout(() => e.target.select(), 10);
      }}
      onBlur={() => {
        const newNum = Number(inputStr);
        if (isNaN(newNum)) {
          setInputStr(value.toString());
        } else {
          onSubmit(newNum);
        }
      }}
    />
  );
};

export default NumericInput;
