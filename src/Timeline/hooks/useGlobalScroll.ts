import { useEffect, useLayoutEffect } from "react";
import useTimelineStore from "./useTimelineStore";

const useGlobalScroll = (scrollRef: React.RefObject<HTMLElement>, { vertical = false, horizontal = false }) => {
  const horizontalScroll = useTimelineStore((state) => state.horizontalScroll);
  const updateHorizontalScroll = useTimelineStore((state) => state.updateHorizontalScroll);

  const verticalScroll = useTimelineStore((state) => state.verticalScroll);
  const updateVerticalScroll = useTimelineStore((state) => state.updateVerticalScroll);

  useLayoutEffect(() => {
    if (horizontal) {
      scrollRef.current!.scrollLeft = horizontalScroll;
    }
  }, [horizontalScroll]);

  useLayoutEffect(() => {
    if (vertical) {
      scrollRef.current!.scrollTop = verticalScroll;
    }
  }, [verticalScroll]);

  useEffect(() => {
    if (horizontal) {
      const handleScroll = (e: Event) => {
        const scrollLeft = (e.target as HTMLElement).scrollLeft;
        updateHorizontalScroll(scrollLeft);
      };
      scrollRef.current?.addEventListener("scroll", handleScroll);
      return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (vertical) {
      const handleScroll = (e: Event) => {
        const scrollTop = (e.target as HTMLElement).scrollTop;
        updateVerticalScroll(scrollTop);
      };
      scrollRef.current?.addEventListener("scroll", handleScroll);
      return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, []);
};

export default useGlobalScroll;
