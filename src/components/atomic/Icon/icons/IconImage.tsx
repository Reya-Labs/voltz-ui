import styled from '@emotion/styled';
import React from 'react';

const Image = styled('img')``;
export const IconImage: React.FunctionComponent<{
  src: string;
  'data-testid'?: string;
  className?: string;
}> = ({ 'data-testid': dataTestId, src, className }) => {
  return (
    <Image
      alt="Done"
      className={className}
      data-testid={dataTestId}
      height="100%"
      src={src}
      width="100%"
    />
  );
};
