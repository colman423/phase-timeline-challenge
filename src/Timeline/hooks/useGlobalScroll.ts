import { useEffect, useLayoutEffect } from "react";
import useTimelineStore from "./useTimelineStore";

export const useGlobalHorizontalScroll = (scrollRef: React.RefObject<HTMLElement>) => {
  const horizontalScroll = useTimelineStore((state) => state.horizontalScroll);
  const updateHorizontalScroll = useTimelineStore((state) => state.updateHorizontalScroll);

  useLayoutEffect(() => {
    scrollRef.current!.scrollLeft = horizontalScroll;
  }, [horizontalScroll]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollLeft = (e.target as HTMLElement).scrollLeft;
      updateHorizontalScroll(scrollLeft);
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);
};

export const useGlobalVerticalScroll = (scrollRef: React.RefObject<HTMLElement>) => {
  const verticalScroll = useTimelineStore((state) => state.verticalScroll);
  const updateVerticalScroll = useTimelineStore((state) => state.updateVerticalScroll);

  useLayoutEffect(() => {
    scrollRef.current!.scrollTop = verticalScroll;
  }, [verticalScroll]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollTop = (e.target as HTMLElement).scrollTop;
      updateVerticalScroll(scrollTop);
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);
};
