import React, { FunctionComponent } from 'react';

import { Container } from './BouncedLoading.styled';

export const BouncedLoading: FunctionComponent = () => {
  const bouncingElements = React.useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => (
        <i key={index} data-testid={`BouncedLoading-Item-${index}`} />
      )),
    [],
  );

  return <Container data-testid="BouncedLoading-Container">{bouncingElements}</Container>;
};
