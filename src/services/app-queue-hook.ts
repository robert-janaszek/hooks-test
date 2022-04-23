import { useWorkerQueue } from "./worker-queue-hook";
import { worker } from './worker/worker';

export const useAppQueue = () => {
  useWorkerQueue({
    queue: {
      initialValues: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
      limit: 2
    },
    worker,
    shouldLogTime: true,
  });

}
