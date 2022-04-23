import { useState } from "react";

const rangeTrim = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export const useCircularState = <T,>(list: T[], initialPosition: number = 0) => {
  const [activeIndex, setActiveIndex] = useState(rangeTrim(initialPosition, 0, list.length));
  const next = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex >= list.length) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex(nextIndex);
  }
  const previous = () => {
    const previousIndex = activeIndex - 1;
    if (previousIndex < 0) {
      setActiveIndex(list.length - 1);
      return;
    }

    setActiveIndex(previousIndex);
  }

  return {
    page: list[activeIndex],
    next,
    previous,
  };
}
