import { useQuery } from 'react-query';
import { worker } from './worker';

export const queryWorker = (entry: string) => {
  return useQuery(['data', entry], () => worker(entry));
}

export const queryWorkerNonTriggering = (entry: string) => {
  return useQuery(['data', entry], () => worker(entry), { enabled: false });
}
