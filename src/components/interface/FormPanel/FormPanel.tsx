import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';

import { SystemStyleObject, Theme } from '../../../theme';
import { Panel } from '../../atomic/Panel/Panel';

export type FormPanelProps = {
  boxShadowType?: 'LP' | 'FT' | 'VT';
  children?: ReactNode;
  noBackground?: boolean;
  isBorrowForm?: boolean;
  sx?: SystemStyleObject<Theme>;
};

export const FormPanel: React.FunctionComponent<FormPanelProps> = ({
  boxShadowType,
  children,
  noBackground = false,
  isBorrowForm = false,
  sx = {},
}) => {
  const getBoxShadow = () => {
    if (!boxShadowType || noBackground) {
      return 'none';
    }

    switch (boxShadowType) {
      case 'FT': {
        return '0px 0px 88px rgba(0, 131, 155, 0.2)';
      }
      case 'LP': {
        return '0px 0px 60px rgba(255, 89, 156, 0.2)';
      }
      case 'VT': {
        return '0px 0px 88px rgba(38, 103, 255, 0.20)';
      }
    }
  };

  if (isBorrowForm)
    return (
      <Panel
        sx={{
          marginLeft: 4,
          marginRight: 4,
          padding: (theme) => theme.spacing(9),
          width: (theme) => theme.spacing(102),
          boxShadow: () => getBoxShadow(),
          ...sx,
        }}
        variant="dark"
      >
        {children}
      </Panel>
    );

  if (noBackground)
    return (
      <Box
        sx={{
          marginLeft: 4,
          marginRight: 4,
          paddingTop: (theme) => theme.spacing(4),
          width: (theme) => theme.spacing(85),
          ...sx,
        }}
      >
        {children}
      </Box>
    );

  return (
    <Panel
      sx={{
        marginLeft: 4,
        marginRight: 4,
        width: (theme) => theme.spacing(97),
        boxShadow: () => getBoxShadow(),
        ...sx,
      }}
      variant="dark"
    >
      {children}
    </Panel>
  );
};
