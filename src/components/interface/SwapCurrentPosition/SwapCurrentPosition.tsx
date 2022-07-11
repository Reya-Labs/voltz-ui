import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
// import { SystemStyleObject, Theme } from '@theme';
import { Position } from '@voltz-protocol/v1-sdk';
import { Button, getPositionBadgeVariant, PositionBadge, SummaryPanel } from '@components/atomic';
import { formatCurrency } from '@utilities';
import { BigNumber } from 'ethers';
import { useAMMContext } from '@hooks';
import { colors }  from '@theme';

export type SwapCurrentPositionProps = {
  onPortfolio: () => void;
  position: Position;
};

const SwapCurrentPosition: React.FunctionComponent<SwapCurrentPositionProps> = ({
  onPortfolio,
  position
}) => {
  // const bottomSpacing: SystemStyleObject<Theme> = {
  //   marginBottom: (theme) => theme.spacing(6)
  // }
  const { positionInfo } = useAMMContext();

  const notional = Math.abs(position.effectiveVariableTokenBalance);
  const margin = position.amm.descale(BigNumber.from(position.margin.toString()));
  const leverage = notional / margin;
  const underlyingTokenName = position.amm.underlyingToken.name || '';

  const getHealthFactor = () => {
    
    if(positionInfo.loading) {
      return 'loading...';
    } else {
      let healthColour = '';
      let text = '';

      switch(positionInfo.result?.healthFactor) {
        case 1: {
          healthColour = colors.vzCustomRed1;
          text = 'DANGER';
          break;
        }
        case 2: {
          healthColour = colors.vzCustomYellow1;
          text = 'WARNING';
          break;
        }
        case 3: {
          healthColour = colors.vzCustomGreen2;
          text = 'HEALTHY';
          break;
        }
      }

      return (
        <span style={{color: healthColour}}>
          {text}
        </span>
      );
    }
  }

  useEffect(() => {
    positionInfo.call(position);
  }, [position]);

  return (
    <Box sx={{
      marginRight: (theme) => theme.spacing(2),
      padding: (theme) => theme.spacing(6),
      width: (theme) => theme.spacing(97),
      boxSizing: 'border-box',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: (theme) => theme.spacing(6) }}>
        <PositionBadge variant={getPositionBadgeVariant(position.positionType)} sx={{ display: 'inline-block', marginLeft: 0 }} />
      </Box>
      <SummaryPanel label="Position information" rows={[
        {
          label: 'NOTIONAL',
          value: `${formatCurrency(notional)} ${underlyingTokenName}`
        },
        {
          label: 'LEVERAGE',
          value: `${formatCurrency(leverage)}x`
        },
        {
          label: 'HEALTH FACTOR',
          value: positionInfo.loading ? 'loading...' : getHealthFactor(),
        },
        {
          label: 'CURRENT MARGIN',
          value: `${formatCurrency(margin)} ${underlyingTokenName}`,
          highlight: true
        },
      ]} />
      <Button
        sx={{ 
          marginTop: (theme) => theme.spacing(6), 
          flexGrow: 0 
        }}
        variant="dark"
        onClick={onPortfolio}
      >
        Portfolio
      </Button>
    </Box>
  );
};

export default SwapCurrentPosition;
