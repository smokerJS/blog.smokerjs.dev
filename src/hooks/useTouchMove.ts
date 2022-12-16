import { useRef, TouchEventHandler } from 'react';

export interface TouchMoveHandler {
  ({ deltaX, deltaY }: { deltaX: number; deltaY: number }): void;
}

const useTouchMove = (touchMoveHandler: TouchMoveHandler) => {
  const $touchStartY = useRef(0);
  const $touchStartX = useRef(0);

  const handleTouchStart: TouchEventHandler = event => {
    $touchStartX.current = event.touches[0].pageX;
    $touchStartY.current = event.touches[0].pageY;
  };
  const handleTouchEnd: TouchEventHandler = event => {
    touchMoveHandler({
      deltaX: $touchStartX.current > event.changedTouches[0].pageX ? 1 : -1,
      deltaY: $touchStartY.current > event.changedTouches[0].pageY ? 1 : -1,
    });
  };
  return {
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useTouchMove;
