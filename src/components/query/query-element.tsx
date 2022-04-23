import { UseQueryResult } from "react-query";

export interface QueryElementProps {
  query: UseQueryResult<string, unknown>;
}

export const QueryElement = (props: QueryElementProps) => {
  const { isFetching, isError, isIdle, data} = props.query;

  if (isIdle) {
    return <div>idle</div>;
  }
  if (isFetching) {
    return <div>Fetching</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return <div>{data}</div>;
}
