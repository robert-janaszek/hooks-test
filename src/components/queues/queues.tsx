import { useAppQueue } from "../../services/app-queue-hook"


export const Queues = () => {
  useAppQueue();

  return <>
    <div>
      Queues component
    </div>
    <div className='open-console'>
      Open console and observe heavy tasks being processed in queue (by two).
    </div>
  </>;
}
