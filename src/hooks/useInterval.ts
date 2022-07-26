import React from 'react';

export type IntervalCallback = (stopInterval: () => void) => void;

export interface useIntervalOption {
  callback?: IntervalCallback;
  delay?: number;
}

export interface useIntervalState extends useIntervalOption {
  id?: number;
}

const useInterval = (callback?: IntervalCallback, delay?: number) => {
  const state = React.useRef<useIntervalState>({
    callback,
    delay,
  });

  const setCallback = (callback: IntervalCallback) => {
    state.current.callback = callback;
  };

  const setDelay = (delay: number) => {
    state.current.delay = delay;
  };

  const setOption = ({ callback, delay }: useIntervalOption) => {
    !!callback && (state.current.callback = callback);
    !!delay && (state.current.delay = delay);
  };

  const stopInterval = () => {
    !!state.current.id && clearInterval(state.current.id);
  };

  const startInterval = () => {
    const { callback, delay } = state.current;
    stopInterval();
    if (!(!!callback && !!delay)) return;
    state.current.id = setInterval(() => {
      callback(stopInterval);
    }, delay);
  };

  React.useEffect(() => {
    return () => {
      stopInterval();
    };
  }, []);

  return {
    setCallback,
    setDelay,
    setOption,
    startInterval,
    stopInterval,
  };
};

export default useInterval;
