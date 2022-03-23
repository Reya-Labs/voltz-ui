import { useState, useEffect, useCallback, useMemo } from 'react';

export type UseAsyncFunctionResult<ArgsType, ResultType> = {
  result: ResultType | null;
  error: boolean;
  loading: boolean;
  call: (args?: ArgsType) => void;
};

const useAsyncFunction = <ArgsType, ResultType>(
  asyncFunction: (args: ArgsType) => Promise<ResultType>,
  lock?: () => void,
): UseAsyncFunctionResult<ArgsType, ResultType> => {
  const [args, setArgs] = useState<ArgsType>();
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const call = useCallback(
    (callArgs?: ArgsType) => {
      setArgs(callArgs);
      setResult(null);
      setError(false);
      setLoading(false);
      setCalled(true);
    },
    [setArgs, setResult, setError, setLoading, setCalled],
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        // Some explanation: TypeScript will not allow a declared type like
        // ArgsType to represent an "empty" value, or no arguments, to be
        // passed to a function.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data = await asyncFunction(args);

        setResult(data);
      } catch (_error) {
        setResult(null);
        setError(true);
      }

      setLoading(false);
      setCalled(false);
    };

    if (called && !loading) {
      load();
    }
  }, [called, lock]);

  return useMemo(
    () => ({
      result,
      error,
      loading,
      call,
    }),
    [result, error, loading, call],
  );
};

export default useAsyncFunction;
