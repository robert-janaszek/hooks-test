import { useQueue } from "@mantine/hooks";
import { useQueries } from "react-query";

export interface WorkerQueryQueue<T, R> {
  query: {
    worker: (entry: T) => Promise<R>;
    getKey: (entry: T) => string[];
  }
  queue: {
    initialValues: T[];
    limit: number;
  },
  shouldLogTime?: boolean;
}

export const useWorkerQueryQueue = <T, R>(props: WorkerQueryQueue<T, R>) => {
  const { state, update } = useQueue<T>({
    initialValues: props.queue.initialValues,
    limit: props.queue.limit
  });
  const markItemReady = (entry: T) => {
    update((state) => state.filter(element => element !== entry));
  }
  const queryFn = async (entry: T) => {
    const result = await props.query.worker(entry);
    markItemReady(entry);
    return result;
  };
  const queryQueue = useQueries(
    props.queue.initialValues.map(entry => ({
      enabled: state.includes(entry),
      queryKey: props.query.getKey(entry),
      queryFn: () => queryFn(entry),
      refetchOnMount: false,
    })),
  );

  return queryQueue;
}