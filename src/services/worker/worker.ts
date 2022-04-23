const heavyEntries = ['II', 'IV', 'V', 'VI'];
const failingEntries = ['XI'];

export const worker = (entry: string) => {
  return new Promise<string>((resolve, reject) => {
    if (failingEntries.includes(entry)) {
      window.setTimeout(() => reject(new Error('There was na error')), 500);
      return;
    }
    if (heavyEntries.includes(entry)) {
      window.setTimeout(() => resolve('Result ' + entry), 6500);
      return;
    }
    window.setTimeout(() => resolve('Result ' + entry), 500);
  });
};
