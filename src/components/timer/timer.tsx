import { useInterval } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { useWindowActivityInterval } from '../../services/window-activity-interval-hook';



// const ActivityComponent = (props: { time: number }) => {
//   const logTime = () => console.log(props.time);
//   const { start } = useInterval(logTime, 10000);
//   useEffect(() => start(), []);
//   return <>{props.time}</>;
// }

// const ActivityComponent = (props: { time: number }) => {
//   const ref = useRef<{ time: number }>();
//   ref.current = props;
//   const logTime = () => console.log(ref.current!.time);
//   const { start } = useInterval(logTime, 10000);
//   useEffect(() => start(), []);
//   return <>{props.time}</>;
// }

const ActivityComponent = (props: { time: number }) => {
  const ref = useRef<{ time: number }>();
  ref.current = props;
  const logTime = () => console.log(ref.current!.time);
  useWindowActivityInterval({ callback: logTime, interval: 10000 });
  return <>{props.time}</>;
}

export const TimerComponent = () => {
  const [time, setTime] = useState(0);
  const { start, stop } = useInterval(() => setTime(t => t + 1), 1000);
  useEffect(() => { start(); return () => stop(); }, []);

  return <ActivityComponent time={time} />
}
