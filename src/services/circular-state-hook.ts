import { useState } from "react";

const rangeCycle = (value: number, min: number, max: number) => {
  if (value < min) return max;
  if (value > max) return min;
  return value;
}

export const useCircularState = <T,>(list: T[], initialPosition: number = 0) => {
  const min = 0;
  const max = list.length - 1;
  const [activeIndex, setActiveIndex] = useState(rangeCycle(initialPosition, min, max));
  const next = () => {
    const nextIndex = rangeCycle(activeIndex + 1, min, max);
    setActiveIndex(nextIndex);
  }
  const previous = () => {
    const previousIndex = rangeCycle(activeIndex - 1, min, max);
    setActiveIndex(previousIndex);
  }

  return {
    page: list[activeIndex],
    next,
    previous,
  };
}
