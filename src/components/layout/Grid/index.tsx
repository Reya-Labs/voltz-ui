import React from 'react';
import { SystemStyleObject, Theme } from '@theme';
import { Box } from './Grid.styled';

type GridProps = {
  sx?: SystemStyleObject<Theme>;
  itemsPerRow: number;
  className?: string;
};

export const Grid: React.FunctionComponent<GridProps> = ({
  className,
  itemsPerRow,
  sx,
  children,
}) => {
  const templateLayout = React.useMemo(
    () => Array.from({ length: itemsPerRow }, () => '1fr').join(' '),
    [itemsPerRow],
  );
  return (
    <Box templateLayout={templateLayout} sx={sx} className={className}>
      {children}
    </Box>
  );
};
