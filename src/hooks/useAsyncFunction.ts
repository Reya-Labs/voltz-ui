import { useState, useEffect, useCallback } from 'react';
import isNull from 'lodash/isNull';

export type UseAsyncFunctionResult<ArgsType, ResultType> = {
  result: ResultType | null;
  error: boolean;
  loading: boolean;
  call: (args?: ArgsType) => void;
};

const useAsyncFunction = <ArgsType, ResultType>(
  asyncFunction: (args?: ArgsType) => Promise<ResultType>,
  lock?: () => void,
): UseAsyncFunctionResult<ArgsType, ResultType> => {
  const [args, setArgs] = useState<ArgsType | undefined | null>(null);
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
      if (isNull(args)) {
        return;
      }

      setLoading(true);

      try {
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

  return {
    result,
    error,
    loading,
    call,
  };
};

export default useAsyncFunction;
