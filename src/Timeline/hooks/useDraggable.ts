import React, { useEffect, useRef } from "react";
import throttle from "lodash/throttle";

/**
 * Custom hook for making an element draggable.
 *
 * @param {React.RefObject<HTMLElement>} ref - The ref of the element to make draggable.
 * @param {Context} initContext - The initial context object.
 * @param {Object} options - Additional options for the draggable behavior.
 * @param {(event: MouseEvent, getContext: () => Context, setContext: (newContext: Context) => void) => void} [options.onDragStart] - Callback function called when dragging starts. Context getter and setter are provided.
 * @param {(event: MouseEvent, getContext: () => Context, setContext: (newContext: Context) => void) => void} [options.onDragEnd] - Callback function called when dragging ends. Context getter and setter are provided.
 * @param {(startEvent: MouseEvent, cntEvent: MouseEvent, prevEvent: MouseEvent, getContext: () => Context, setContext: (newContext: Context) => void) => void} [options.onDragMove] - Callback function called when the element is being dragged. Context getter and setter are provided.
 * @param {number} [options.throttleTime=10] - The time interval (in milliseconds) to throttle the `onDragMove` callback.
 */
const useDraggable = <RefElem extends HTMLElement, Context>(
  ref: React.RefObject<RefElem>,
  initContext: Context,
  options: {
    onDragStart?: (event: MouseEvent, getContext: () => Context, setContext: (newContext: Context) => void) => void;
    onDragEnd?: (event: MouseEvent, getContext: () => Context, setContext: (newContext: Context) => void) => void;
    onDragMove?: (
      startEvent: MouseEvent,
      cntEvent: MouseEvent,
      prevEvent: MouseEvent,
      getContext: () => Context,
      setContext: (newContext: Context) => void
    ) => void;
    throttleTime?: number;
  }
) => {
  const { onDragStart, onDragEnd, onDragMove, throttleTime = 10 } = options;

  const context = useRef<Context>(initContext);
  const getContext = () => context.current;
  const setContext = (newContext: any) => (context.current = newContext);

  // NOTE: update ref in each render, to call the newest function reference
  const onDragStartNewest = useRef(onDragStart);
  const onDragEndNewest = useRef(onDragEnd);
  const onDragMoveNewest = useRef(onDragMove);
  onDragStartNewest.current = onDragStart;
  onDragEndNewest.current = onDragEnd;
  onDragMoveNewest.current = onDragMove;

  const startDragging = (event: MouseEvent) => {
    const startEvent = event;
    let prevEvent = event;

    const draggingWindow = throttle((event: MouseEvent) => {
      onDragMoveNewest.current?.(startEvent, event, prevEvent, getContext, setContext);
      prevEvent = event;
    }, throttleTime);

    const stopDragging = (event: MouseEvent) => {
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("mousemove", draggingWindow);

      document.body.classList.remove("select-none");
      onDragEndNewest.current?.(event, getContext, setContext);
    };

    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mousemove", draggingWindow);

    document.body.classList.add("select-none");
    onDragStartNewest.current?.(event, getContext, setContext);
  };

  useEffect(() => {
    ref.current?.addEventListener("mousedown", startDragging);
    return () => ref.current?.removeEventListener("mousedown", startDragging);
  }, []);

  return ref;
};

export default useDraggable;
