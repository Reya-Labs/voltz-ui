export const getErrorMessage = (error: unknown): string => {
  if (error && (error as Error).message) {
    return (error as Error).message.toString();
  }

  return JSON.stringify(error);
};
