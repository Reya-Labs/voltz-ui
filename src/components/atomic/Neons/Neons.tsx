
import React from 'react';
import { ReactComponent as TableNeonBox1 } from './table-neon-box-1.svg';
import { ReactComponent as TableNeonBox2 } from './table-neon-box-2.svg';
import { ReactComponent as FormNeonBox1 } from './form-neon-box-1.svg';
import { ReactComponent as FormNeonBox2 } from './form-neon-box-2.svg';
import { Agents } from '@contexts';
import { useAgent } from '@hooks';

export type NeonsProps = {
  view?: 'form' | 'table' | 'none';
};

const Neons: React.FunctionComponent<NeonsProps> = ({ view = 'table' }) => {
  const { agent } = useAgent();

  if (view === 'none') return null;

  if (view === 'table') return (
    <>
      <TableNeonBox1 style={{
        position: 'absolute',
        left: '46%',
        top: '160px',
        transform: 'rotate(-30deg)',
      }} />
      <TableNeonBox2 style={{
        position: 'absolute',
        left: '46%',
        top: '160px',
        transform: 'rotate(-21.21deg)',
      }} />
    </>
  );

  return (
    <>
      <FormNeonBox1 style={{
        position: 'absolute',
        left: 'calc(50% - 196px)',
        top: '180px',
        transform: agent === Agents.VARIABLE_TRADER ? 'matrix(-0.97, -0.26, -0.26, 0.97, 0, 0)' : 'rotate(-15deg)',
        transition: 'transform 0.4s ease-in-out'
      }} />
      <FormNeonBox2 style={{
        position: 'absolute',
        left: 'calc(50% - 196px)',
        top: '180px',
        transform: agent === Agents.VARIABLE_TRADER ? 'matrix(-0.92, -0.38, -0.38, 0.92, 0, 0)' : 'rotate(-22.5deg)',
        transition: 'transform 0.4s ease-in-out'
      }} />
    </>
  );
};

export default Neons;
    