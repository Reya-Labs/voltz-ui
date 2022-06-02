import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import useDebounceFunc from './useDebounceFunc';

export type UseAsyncFunctionResult<ArgsType, ResultType> = {
  result: ResultType | null;
  errorMessage: string | null;
  // error: boolean;
  loading: boolean;
  call: (args?: ArgsType) => void;
};

const useAsyncFunction = <ArgsType, ResultType>(
  asyncFunction: (args: ArgsType) => Promise<ResultType>,
  lock?: () => void,
  debounceDelay = 0,
): UseAsyncFunctionResult<ArgsType, ResultType> => {
  const [args, setArgs] = useState<ArgsType>();
  const [result, setResult] = useState<ResultType | null>(null);
  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const call = useCallback(
    (callArgs?: ArgsType) => {
      setArgs(callArgs);
      setResult(null);
      // setError(false);
      setLoading(false);
      setCalled(true);
    },
    [setArgs, setResult, setLoading, setCalled],
  );
  const request = useRef<Promise<ResultType>>();

  const load = async () => {
    setLoading(true);

    try {
      // Some explanation: TypeScript will not allow a declared type like
      // ArgsType to represent an "empty" value, or no arguments, to be
      // passed to a function.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const req = asyncFunction(args);
      request.current = req;
      const data = await request.current;

      // We need to stop older (cancelled) requests from overwriting the current data
      // req.current will always point to the latest request, where as req will get stale.
      if(req === request.current) {
        setResult(data);
      }
    } catch (_error) {
      // eslint-disable-next-line
      console.log('_error: ', _error)
      if (_error instanceof Error) {
        setErrorMessage(_error.message)
      } else {
        setErrorMessage('Unrecognized Error')
      }
      setResult(null);
      // setError(true);
    }

    setLoading(false);
    setCalled(false);
  };
  const debouncedLoad = useDebounceFunc(load, debounceDelay);

  useEffect(() => {
    if (called && !loading) {
      debouncedLoad();
    }
  }, [called, args, lock]);

  return useMemo(
    () => ({
      result,
      errorMessage,
      // error,
      loading,
      call,
    }),
    [result, errorMessage, loading, call],
  );
};

export default useAsyncFunction;
