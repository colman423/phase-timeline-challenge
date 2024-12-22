import { RefObject, useLayoutEffect, useState } from "react";

/**
 * A React hook that observes the size of a referenced HTML element
 * and applies a calculation function to the observed size.
 *
 * @param {React.RefObject<HTMLElement>} ref - A React ref object pointing to the HTML element to observe.
 * @param {(size: { width: number; height: number }) => void} callback - A callback function that receives the observed size of `ref` when it changes.
 */
const useScalable = (ref: RefObject<HTMLElement>, callback: (size: { width: number; height: number }) => void) => {
  const [refSize, setRefSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentBoxSize?.[0].inlineSize ?? entry.contentRect.width;
        const height = entry.contentBoxSize?.[0].blockSize ?? entry.contentRect.height;
        setRefSize({ width, height });
      }
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  useLayoutEffect(() => {
    callback(refSize);
  }, [refSize, callback]);
};

export default useScalable;
