import { useWorkerQueue } from "./worker-queue-hook";
import { heavyWorker } from './worker/worker';

export const useAppQueue = () => {
  useWorkerQueue({
    queue: {
      initialValues: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
      limit: 2
    },
    worker: heavyWorker,
    shouldLogTime: true,
  });

}
