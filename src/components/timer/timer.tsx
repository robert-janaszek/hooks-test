import { useInterval } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { useWindowActivityInterval } from '../../services/window-activity-interval-hook';

const ActivityComponent = (props: { time: number }) => {
  const ref = useRef<{ time: number }>();
  ref.current = props;
  const logTime = () => console.log(ref.current!.time);
  useWindowActivityInterval({ callback: logTime, interval: 10000 });
  return <>
    <div>
      Activity component: {props.time}
    </div>
    <div className='open-console'>
      Open console and observe 10s interval being logged.
    </div>
  </>;
}

export const TimerComponent = () => {
  const [time, setTime] = useState(0);
  const { start, stop } = useInterval(() => setTime(t => t + 1), 1000);
  useEffect(() => { start(); return () => stop(); }, []);

  return <ActivityComponent time={time} />
}
