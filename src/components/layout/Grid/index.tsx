import React from 'react';

import { Box } from './Grid.styled';

type GridProps = {
  itemsPerRow: number;
  className?: string;
};

export const Grid: React.FunctionComponent<GridProps> = ({ className, itemsPerRow, children }) => {
  const templateLayout = React.useMemo(
    () => Array.from({ length: itemsPerRow }, () => '1fr').join(' '),
    [itemsPerRow],
  );
  return (
    <Box className={className} templateLayout={templateLayout}>
      {children}
    </Box>
  );
};
