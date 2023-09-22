import { useSearchParams } from 'react-router-dom';

export const useAppSearchParams = (params: string[]): (string | null)[] => {
  const [searchParams] = useSearchParams();
  return params.map((param) => searchParams.get(param));
};
