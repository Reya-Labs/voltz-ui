import React from 'react';
import { NeonBox1, NeonBox2 } from './Neons.styled';

const Neons: React.FunctionComponent = React.memo(() => {
  return (
    <>
      <NeonBox1 />
      <NeonBox2 />
    </>
  );
});

export default Neons;
