import { useQuery } from 'react-query';
import { heavyWorker } from './worker';

export const queryWorker = (entry: string) => {
  return useQuery(['data', entry], () => heavyWorker(entry));
}

export const queryWorkerNonTriggering = (entry: string) => {
  return useQuery(['data', entry], () => heavyWorker(entry), { enabled: false });
}
