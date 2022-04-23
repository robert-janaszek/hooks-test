import { useWorkerQueryQueue } from "../../services/worker-query-queue";
import { worker } from "../../services/worker/worker";
import { QueryElement } from "./query-element";

export const QueryComponent = () => {
  const elements = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  const queries = useWorkerQueryQueue({
    queue: {
      initialValues: elements,
      limit: 2,
    },
    query: {
      getKey: (entry) => ['data', entry],
      worker,
    },
    shouldLogTime: true,
  })

  return <>
    <div>Query component</div>
    <>
      {queries.map((query, index) => <QueryElement key={index} query={query} />)}
    </>
    <div className='open-console'>
      ...
    </div>
  </>;
}