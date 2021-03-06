import { useQueriesQueue } from "../../services/queries-queue-hook";
import { heavyWorker } from "../../services/worker/worker";
import { QueryElement } from "./query-element";

export const QueryComponent = () => {
  const elements = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

  const queries = useQueriesQueue({
    queue: {
      initialValues: elements,
      limit: 2,
    },
    query: (entry) => ({
      queryKey: ['data', entry],
      queryFn: () => heavyWorker(entry),
      refetchOnMount: false,
      retryOnMount: false,
    }),
  });

  return <>
    <div>Query component</div>
    <>
      {queries.map((query, index) => <QueryElement key={index} query={query} />)}
    </>
    <div className='open-console'>
      Observe how requests are scheduled in queue.
    </div>
  </>;
}