import React from 'react';
import { ReactComponent as NeonBox1 } from './neon1.svg';
import { ReactComponent as NeonBox2 } from './neon2.svg';

export type NeonsProps = {};

const Neons: React.FunctionComponent<NeonsProps> = () => {
  return (
    <>
      <NeonBox1
        style={{
          position: 'absolute',
          left: '42.92%',
          top: '-66px',
        }}
      />
      <NeonBox2
        style={{
          position: 'absolute',
          left: '46.46%',
          top: '-80px',
        }}
      />
    </>
  );
};

export default Neons;
