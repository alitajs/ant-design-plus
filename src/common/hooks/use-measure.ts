import { DependencyList, useState, useCallback } from 'react';

export const useMeasure = (
  deps: DependencyList = []
): {
  rect: ClientRect;
  ref: any;
} => {
  const [rect, setRect] = useState<ClientRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  });
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, deps);
  return { ref, rect };
};

export const useMeasureBatch = (count: number, deps: DependencyList = []) => {
  const measureResults = [];
  for (let i = 0; i < count; ++i) {
    const [rect, setRect] = useState({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0
    });

    const ref = useCallback((node) => {
      if (node !== null) {
        setRect(node.getBoundingClientRect());
      }
    }, deps);

    measureResults[i] = {
      rect,
      ref
    };
  }
  return measureResults;
};
