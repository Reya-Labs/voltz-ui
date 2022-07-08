import { Agents } from '@contexts';
import { Mode, TEMPORARY_Pool, TableData } from './types';

export type TransformDataArgs = {
  mode: Mode;
  data: TEMPORARY_Pool[];
  agent?: Agents;
};

const transformData = ({ data, mode, agent }: TransformDataArgs): TableData[] => {
  if (mode === 'pools') {
    return data;
  }

  const reducedData = data.reduce((acc: TableData[], datum: TEMPORARY_Pool) => {
    const { positions, ...pool } = datum;
    const filteredPositions = positions.filter((position) => position.agent === agent);

    const verbosePositions = filteredPositions.map(({ id, ...position }) => ({
      ...pool,
      ...position,
      positionId: id,
    }));

    return [...acc, ...verbosePositions];
  }, []);

  return reducedData;
};

export default transformData;
