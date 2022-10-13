import React from 'react';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@theme';

type GridProps = {
  sx?: SystemStyleObject<Theme>;
  itemsPerRow: number;
};

export const Grid: React.FunctionComponent<GridProps> = ({ itemsPerRow, sx, children }) => {
  const templateLayout = React.useMemo(
    () => Array.from({ length: itemsPerRow }, () => '1fr').join(' '),
    [itemsPerRow],
  );
  return (
    <Box
      sx={{
        ...sx,
        display: 'grid',
        gridTemplateColumns: templateLayout,
      }}
    >
      {children}
    </Box>
  );
};
