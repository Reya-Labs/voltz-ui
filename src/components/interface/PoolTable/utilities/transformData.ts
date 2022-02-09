import { Mode, TEMPORARY_Pool, TableData } from '../types';

export type TransformDataArgs = {
  mode: Mode;
  data: TEMPORARY_Pool[];
};

const transformData = ({ data, mode }: TransformDataArgs): TableData[] => {
  if (mode === 'pools') {
    return data;
  }

  const reducedData = data.reduce((acc: TableData[], datum: TEMPORARY_Pool) => {
    const { positions, ...pool } = datum;
    const verbosePositions = positions.map((position) => ({
      ...pool,
      ...position,
    }));

    return [...acc, ...verbosePositions];
  }, []);

  return reducedData;
};

export default transformData;
