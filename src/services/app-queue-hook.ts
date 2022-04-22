import { useQueue } from "@mantine/hooks"
import { useWorkerQueue } from "./worker-queue-hook";

const heavyEntries = ['II', 'IV', 'V', 'VI'];

export const worker = (entry: string) => {
  return new Promise<void>((resolve) => {
    if (heavyEntries.includes(entry)) {
      window.setTimeout(() => resolve(), 6500);
      return;
    }
    window.setTimeout(() => resolve(), 500);
  });
};

export const useAppQueue = () => {
  useWorkerQueue({
    queue: {
      initialValues: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
      limit: 2
    },
    worker,
    shouldLogTime: true,
  });

}
