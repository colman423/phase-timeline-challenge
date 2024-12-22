import { useEffect, useLayoutEffect } from "react";
import useTimelineStore from "./useTimelineStore";

/**
 * Custom hook that synchronizes the horizontal scroll position of a scrollable element
 * with the state in the timeline store.
 *
 * @param scrollRef - Reference to the scrollable element.
 */
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

/**
 * Custom hook that synchronizes the vertical scroll position of a scrollable element
 * with the state in the timeline store.
 *
 * @param scrollRef - Reference to the scrollable element.
 */
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
