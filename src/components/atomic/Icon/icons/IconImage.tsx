import React from 'react';

export const IconImage: React.FunctionComponent<{ src: string; 'data-testid'?: string }> = ({
  'data-testid': dataTestId,
  src,
}) => {
  return <img alt="Done" data-testid={dataTestId} height="100%" src={src} width="100%" />;
};
