import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Panel } from '@components/atomic';
import { SystemStyleObject, Theme } from '@theme';

export type FormPanelProps = {
  boxShadowType?: 'LP' | 'FT' | 'VT';
  children?: ReactNode;
  noBackground?: boolean;
  sx?: SystemStyleObject<Theme>
};

export const FormPanel: React.FunctionComponent<FormPanelProps> = ({ 
  boxShadowType,
  children, 
  noBackground = false,
  sx = {},
}) => {
  const getBoxShadow = () => {
    if(!boxShadowType || noBackground) {
      return 'none'
    }

    switch(boxShadowType) {
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
  }

  if(noBackground) return (
    <Box sx={{
      marginLeft: 4,
      marginRight: 4,
      paddingTop: (theme) => theme.spacing(4),
      width: (theme) => theme.spacing(77),
      ...sx
    }}>
      {children}
    </Box>
  );

  return (
    <Panel variant="dark" sx={{
      marginLeft: 4,
      marginRight: 4,
      width: (theme) => theme.spacing(97),
      boxShadow: () => getBoxShadow(),
      ...sx
    }}>
      {children}
    </Panel>
  );
};

export default FormPanel;
