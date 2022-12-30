import Box from '@mui/material/Box';

import { colors, SystemStyleObject, Theme } from '../../../../theme';
import { PortfolioHeaderBox } from './PortfolioHeaderBox';
import { PortfolioHeaderValue } from './PortfolioHeaderValue';

export type PortfolioHeaderHealthProps = {
  positionsDanger: number | undefined;
  positionsHealthy: number | undefined;
  positionsWarning: number | undefined;
};

const itemStyles: SystemStyleObject<Theme> = {
  padding: (theme) => theme.spacing(2),
  marginLeft: (theme) => theme.spacing(1),

  '&:first-of-type': {
    marginLeft: 0,
  },
};

const itemTextStyles: SystemStyleObject<Theme> = {
  fontSize: '14px',
};

export const PortfolioHeaderHealth = ({
  positionsDanger,
  positionsHealthy,
  positionsWarning,
}: PortfolioHeaderHealthProps) => {
  return (
    <PortfolioHeaderValue label="Positions health">
      <Box sx={{ display: 'flex' }}>
        <PortfolioHeaderBox
          sx={itemStyles}
          textSx={{ ...itemTextStyles, color: colors.vzCustomGreen1.base }}
        >
          {positionsHealthy ?? '...'} healthy
        </PortfolioHeaderBox>
        <PortfolioHeaderBox
          sx={itemStyles}
          textSx={{ ...itemTextStyles, color: colors.vzCustomYellow1.base }}
        >
          {positionsWarning ?? '...'} warning
        </PortfolioHeaderBox>
        <PortfolioHeaderBox
          sx={itemStyles}
          textSx={{ ...itemTextStyles, color: colors.vzCustomRed1.base }}
        >
          {positionsDanger ?? '...'} danger
        </PortfolioHeaderBox>
      </Box>
    </PortfolioHeaderValue>
  );
};
