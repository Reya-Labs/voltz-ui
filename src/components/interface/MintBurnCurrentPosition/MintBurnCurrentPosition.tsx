import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
// import { SystemStyleObject, Theme } from '@theme';
import { Position } from '@voltz-protocol/v1-sdk';
import { Button, Ellipsis, Loading, PositionBadge, SummaryPanel } from '@components/atomic';
import { FormPanel } from '@components/interface';
import { formatCurrency, formatNumber } from '@utilities';
import { BigNumber } from 'ethers';
import { useAMMContext } from '@contexts';
import { colors }  from '@theme';
import { MintBurnFormModes } from '@contexts';

export type MintBurnCurrentPositionProps = {
  formMode: MintBurnFormModes;
  onPortfolio: () => void;
  position: Position;
};

export const MintBurnCurrentPosition: React.FunctionComponent<MintBurnCurrentPositionProps> = ({
  formMode,
  onPortfolio,
  position
}) => {
  // const bottomSpacing: SystemStyleObject<Theme> = {
  //   marginBottom: (theme) => theme.spacing(6)
  // }
  const { positionInfo } = useAMMContext();

  const currentPositionBadgeText = `${formMode !== MintBurnFormModes.ROLLOVER ? 'Previous' : 'Current'} position: LP`;
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

  const rows: React.ComponentProps<typeof SummaryPanel>['rows'] = [
    {
      label: 'NOTIONAL',
      value: `${formatCurrency(notional)} ${underlyingTokenName}`
    },
    {
      label: 'LEVERAGE',
      value: `${formatCurrency(leverage)}x`
    },
    {
      label: 'FIXED LOW',
      value: `${formatNumber(position?.fixedRateLower.toNumber())}%`
    },
    {
      label: 'FIXED HIGH',
      value: `${formatNumber(position?.fixedRateUpper.toNumber())}%`
    },
    {
      label: 'HEALTH FACTOR',
      value: positionInfo.loading ? <Ellipsis /> : getHealthFactor(),
    },
    {
      label: 'CURRENT MARGIN',
      value: `${formatCurrency(margin)} ${underlyingTokenName}`,
      highlight: true
    }
  ]

  if(formMode === MintBurnFormModes.ROLLOVER) {
    rows.push({
      label: 'CASHFLOW',
      value: positionInfo?.result
        ? `${formatCurrency(positionInfo?.result?.accruedCashflow)} ${underlyingTokenName}`
        : <Ellipsis />,
      highlight: true
    });

    rows.push({
      label: 'ROLLOVER BALANCE',
      value: positionInfo?.result
        ? `${formatCurrency(positionInfo?.result?.accruedCashflow + margin)} ${underlyingTokenName}`
        : <Ellipsis />,
      highlight: true,
      bold: true
    });
  };

  return (
    <FormPanel noBackground>
      <Box sx={{ width: (theme) => theme.spacing(53), marginLeft: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: (theme) => theme.spacing(6) }}>
          <PositionBadge 
            variant='FC' 
            text={currentPositionBadgeText} 
            sx={{ display: 'inline-block', marginLeft: 0 }} 
          />
        </Box>
        {(positionInfo.loading || !positionInfo.result)
          ? <Loading />
          : <SummaryPanel label="Position information" rows={rows} />
        }
        <Button
          sx={{ 
            marginTop: (theme) => theme.spacing(6), 
            flexGrow: 0 
          }}
          variant="dark-link"
          onClick={onPortfolio}
          size='small'
        >
          Portfolio
        </Button>
      </Box>
    </FormPanel>
  );
};

export default MintBurnCurrentPosition;
