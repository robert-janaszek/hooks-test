const heavyEntries = ['II', 'IV', 'V', 'VI'];

export const worker = (entry: string) => {
  return new Promise<string>((resolve) => {
    if (heavyEntries.includes(entry)) {
      window.setTimeout(() => resolve('Result ' + entry), 6500);
      return;
    }
    window.setTimeout(() => resolve('Result ' + entry), 500);
  });
};
