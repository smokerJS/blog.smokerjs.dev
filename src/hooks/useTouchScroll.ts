import { useRef, TouchEventHandler } from 'react';

export interface TouchMoveHandler {
    ({deltaY}: {deltaY: number}): void;
}

const useTouchScroll = (touchMoveHandler: TouchMoveHandler) => {
    const $touchStartY = useRef(0);
    
    const onTouchStartHandler: TouchEventHandler = (event) => {
        $touchStartY.current = event.touches[0].pageY
    }
    const onTouchEndHandler: TouchEventHandler = (event) => {
        touchMoveHandler({deltaY: $touchStartY.current > event.changedTouches[0].pageY ? 1 : -1})
    }
    return {
        onTouchStartHandler,
        onTouchEndHandler
    }
}

export default useTouchScroll;