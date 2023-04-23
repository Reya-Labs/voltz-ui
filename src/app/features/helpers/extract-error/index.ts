const isError = (e: Error | never): e is Error => {
  return !!(e && e.stack && e.message);
};

export const extractError = (err: unknown): string => {
  if (typeof err === 'string') {
    return err;
  }
  if (err instanceof Error || isError(err as never)) {
    return (err as Error).message;
  }
  return '';
};
