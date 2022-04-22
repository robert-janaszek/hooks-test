import { useWindowWorkerQueue } from "../../services/window-worker-queue-hook";

export const TimerAndQueue = () => {
  useWindowWorkerQueue();

  return <>
    <div>
      Timer and Queue component
    </div>
    <div className='open-console'>
      Open console. Execution is similar to Queue, but it halts when window is hidden.
    </div>
  </>;
}