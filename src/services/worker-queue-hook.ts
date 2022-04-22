import { useListState, useQueue } from "@mantine/hooks";
import { useEffect } from "react";
import { useWorkerQueueConditional, WorkerQueueConditionalProps } from "./worker-queue-conditional-hook";

export type WorkerQueueProps<T> = Omit<WorkerQueueConditionalProps<T>, 'isActive'>;

export const useWorkerQueue = <T,>(props: WorkerQueueProps<T>) => {
  useWorkerQueueConditional({
    ...props,
    isActive: true,
  })
}