import React, { FunctionComponent } from 'react';

import { Container } from './Confetti.styled';

export const Confetti: FunctionComponent = ({ children }) => {
  const leafElements = React.useMemo(
    () => Array.from({ length: 20 }, (_, index) => <i key={index} />),
    [],
  );

  return (
    <Container>
      {children}
      {leafElements}
    </Container>
  );
};
