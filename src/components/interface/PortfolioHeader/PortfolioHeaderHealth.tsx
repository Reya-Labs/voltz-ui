import React from 'react';
import Box from '@mui/material/Box';
import { colors, SystemStyleObject, Theme } from '@theme';
import PortfolioHeaderValue from './PortfolioHeaderValue';
import PortfolioHeaderBox from './PortfolioHeaderBox';
import { PortfolioHeaderProps } from './PortfolioHeader';

export type PortfolioHeaderHealthProps = {
  positionsDanger: PortfolioHeaderProps['positionsDanger'];
  positionsHealthy: PortfolioHeaderProps['positionsHealthy'];
  positionsWarning: PortfolioHeaderProps['positionsWarning'];
};

const itemStyles: SystemStyleObject<Theme> = { 
  padding: (theme) => theme.spacing(2),
  marginLeft: (theme) => theme.spacing(1),

  '&:first-of-type': {
    marginLeft: 0
  }
};

const itemTextStyles: SystemStyleObject<Theme> = { 
  fontSize: '14px'
};
 
const PortfolioHeaderHealth = ({ positionsDanger = 0, positionsHealthy = 0, positionsWarning = 0 }: PortfolioHeaderHealthProps) => {
  return (
    <PortfolioHeaderValue label='Positions health'>
      <Box sx={{ display: 'flex' }}>
        <PortfolioHeaderBox 
          sx={itemStyles} 
          textSx={{ ...itemTextStyles, color: colors.vzCustomGreen1 }}>
          {positionsHealthy} healthy
        </PortfolioHeaderBox>
        <PortfolioHeaderBox 
          sx={itemStyles} 
          textSx={{ ...itemTextStyles, color: colors.vzCustomYellow1 }}>
          {positionsWarning} warning
        </PortfolioHeaderBox>
        <PortfolioHeaderBox 
          sx={itemStyles} 
          textSx={{ ...itemTextStyles, color: colors.vzCustomRed1 }}>
          {positionsDanger} danger
        </PortfolioHeaderBox>
      </Box>
    </PortfolioHeaderValue>
  );
}

export default PortfolioHeaderHealth
