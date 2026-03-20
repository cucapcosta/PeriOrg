import { useEffect, useRef } from 'react';

export function useAnimationFrame(
  callback: (dt: number) => void,
  active: boolean = true,
  targetFps: number = 30
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;

    let frameId: number;
    let lastTime = 0;
    const interval = 1000 / targetFps;

    const loop = (time: number) => {
      frameId = requestAnimationFrame(loop);
      const delta = time - lastTime;
      if (delta >= interval) {
        lastTime = time - (delta % interval);
        callbackRef.current(delta / 1000);
      }
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [active, targetFps]);
}
