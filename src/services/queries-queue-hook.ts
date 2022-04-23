import { useQueue } from "@mantine/hooks";
import { useEffect } from "react";
import { useQueries, UseQueryOptions } from "react-query";

export interface WorkerQueryQueue<T, R> {
  query: (entry: T) => UseQueryOptions<T>;
  queue: {
    initialValues: T[];
    limit: number;
  };
}

export const useQueriesQueue = <T, R>(props: WorkerQueryQueue<T, R>) => {
  const { state, update, cleanQueue } = useQueue<T>({
    initialValues: props.queue.initialValues,
    limit: props.queue.limit
  });
  const markItemReady = (entry: T) => {
    if (state.includes(entry)) {
      update((state) => state.filter(element => element !== entry));
    }
  }

  const queryQueue = useQueries(
    props.queue.initialValues.map(entry => ({
      enabled: state.includes(entry),
      ...props.query(entry),
    })),
  );

  // useQueries doesn't return key props
  // only mapping by index is possible
  queryQueue.map((query, index) => [index, query.isError || query.isFetched] as const)
    .filter(([, status]) => status)
    .map(([index]) => props.queue.initialValues[index])
    .forEach(markItemReady);
  
  useEffect(() => () => cleanQueue(), []);

  return queryQueue;
}