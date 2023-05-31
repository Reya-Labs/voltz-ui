import styled from '@emotion/styled';
import { Skeleton as SkeletonComponent } from 'brokoli-ui';
import React from 'react';

export const Skeleton = styled(SkeletonComponent)`
  width: 100%;
  border-radius: 8px;
  height: 130px;
`;

export const VaultListItemSkeleton: React.FunctionComponent = () => {
  return (
    <Skeleton
      colorToken="liberty2"
      data-testid="VaultListItemSkeleton-Skeleton"
      typographyToken="primaryBodySmallRegular"
      variant="rectangular"
    />
  );
};
