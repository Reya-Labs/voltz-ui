import { useState, useEffect } from 'react';

const useStateMemo = <T>(input: T): [T, (value: T) => void] => {
  const [value, setValue] = useState(input);

  useEffect(() => {
    setValue(input);
  }, [input]);

  return [value, setValue];
};

export default useStateMemo;
