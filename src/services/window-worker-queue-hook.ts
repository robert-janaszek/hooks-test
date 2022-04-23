import { useWindowActivity } from "./window-activity-hook";
import { useWorkerQueueConditional } from "./worker-queue-conditional-hook";
import { worker } from "./worker/worker";

export const useWindowWorkerQueue = () => {
  const isActive = useWindowActivity();

  useWorkerQueueConditional({
    isActive,
    queue: {
      initialValues: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
      limit: 2
    },
    worker,
    shouldLogTime: true,
  });

}