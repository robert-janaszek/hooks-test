import { useListState, useQueue } from "@mantine/hooks";
import { useEffect } from "react";

export interface WorkerQueueConditionalProps<T> {
  worker: (entry: T) => Promise<unknown>;
  queue: {
    initialValues: T[];
    limit: number;
  },
  shouldLogTime?: boolean;
  isActive: boolean;
}

export const useWorkerQueueConditional = <T,>(props: WorkerQueueConditionalProps<T>) => {
  const { state, update } = useQueue<T>({
    initialValues: props.queue.initialValues,
    limit: props.queue.limit
  });
  const [workerItems, workerListHandlers] = useListState<T>();

  useEffect(() => {
    state.forEach(entry => {
      if (workerItems.includes(entry)) {
        return;
      }
      if (!props.isActive) {
        return;
      }

      workerListHandlers.append(entry);
      const startTime = Date.now();
      props.worker(entry).then(() => {
        const endTime = Date.now();
        if (props.shouldLogTime) {
          console.log(`Entry: ${entry} took ${endTime - startTime}ms.`);
        }
        update((state) => state.filter(element => element !== entry));
      });
    });
  }, [state, props.isActive]);
}