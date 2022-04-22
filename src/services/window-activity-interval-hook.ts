import { useInterval } from "@mantine/hooks"
import { useEffect } from "react";
import { isDocumentActive, useWindowActivity } from "./window-activity-hook";

export interface WindowActivityIntervalProps {
  callback: () => void;
  interval: number;
}

export const useWindowActivityInterval = (props: WindowActivityIntervalProps) => {
  const { active, start, stop } = useInterval(() => {
    if (!isDocumentActive()) {
      stop();
      return;
    }
    props.callback();
  }, props.interval);
  useEffect(() => { start(); return () => stop(); }, []);
  useWindowActivity({
    onActivate: () => {
      if (!active) {
        props.callback();
        start();
      }
    },
  });

}
