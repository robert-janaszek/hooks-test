import { useQueue } from "@mantine/hooks";
import { useQueries, useQueryClient, UseQueryOptions, UseQueryResult } from "react-query";

export interface QueriesQueueProps<T extends string | number> {
  query: (entry: T) => UseQueryOptions<T>;
  queue: {
    initialValues: T[];
    limit: number;
  };
}

/** useQueriesQueue - Fetch specified queries in queue (instead of everyone at once).
 * Queries are still going to be run all in parallel on remount or refetch.
 * 
 * To prevent running on remount this use one of those 2 flags:
 * `staleTime: Infinity` or
 * `refetchOnMount: false`
 */
export const useQueriesQueue = <T extends string | number>(props: QueriesQueueProps<T>) => {
  const { state: queue, update } = useQueue<T>({
    initialValues: props.queue.initialValues,
    limit: props.queue.limit,
  });
  const queryClient = useQueryClient();

  const processed = new Set<T>();

  const markItemReady = (entry: T) => {
    if (queue.includes(entry)) {
      update((state) => state.filter(element => element !== entry));
    }
    processed.add(entry);
  }
  const queries = props.queue.initialValues.map(entry => ({
    ...props.query(entry),
    entry,
  }));
  
  queries.forEach(query => {
    const queryState = queryClient.getQueryState(query.queryKey!);
    if (queryState?.status === 'success' || queryState?.status === 'error') {
      markItemReady(query.entry);
    }
    if (queryState?.status === 'loading') {
      processed.add(query.entry);
    }
  });

  const queriesWithEnabledFlag = queries.map(query => ({
    ...query,
    enabled: queue.includes(query.entry) || processed.has(query.entry),
  }));

  const queryQueue = useQueries(queriesWithEnabledFlag);

  return queryQueue;
}
