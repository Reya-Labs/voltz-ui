import { useState, useEffect, SetStateAction } from 'react';

const useStateMemo = <T>(input: T): [T, (value: SetStateAction<T>) => void] => {
  const [value, setValue] = useState(input);

  useEffect(() => {
    setValue(input);
  }, [input]);

  return [value, setValue];
};

export default useStateMemo;
