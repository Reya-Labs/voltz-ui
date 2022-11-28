import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Position } from '@voltz-protocol/v1-sdk';
import { Button } from '../../atomic/Button/Button';
import { Ellipsis } from '../../atomic/Ellipsis/Ellipsis';
import { PositionBadge } from '../../atomic/PositionBadge/PositionBadge';
import { SummaryPanel } from '../../atomic/SummaryPanel/SummaryPanel';
import { BigNumber } from 'ethers';
import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { colors } from '../../../theme';
import isUndefined from 'lodash/isUndefined';
import { FormPanel } from '../FormPanel/FormPanel';
import { SwapFormModes } from '../SwapForm';
import { formatCurrency } from '../../../utilities/number';

export type SwapCurrentPositionProps = {
  formMode: SwapFormModes;
  onPortfolio: () => void;
  position: Position;
  gaButtonId?: string;
};

export const SwapCurrentPosition: React.FunctionComponent<SwapCurrentPositionProps> = ({
  formMode,
  onPortfolio,
  position,
  gaButtonId,
}) => {
  const { positionInfo } = usePositionContext();

  const currentPositionBadgeText = `${
    positionInfo?.result?.beforeMaturity === false ? 'Previous' : 'Current'
  } position: ${position.positionType === 1 ? 'Fix taker' : 'Variable taker'}`;
  const notional = Math.abs(position.effectiveVariableTokenBalance);
  const margin = position.amm.descale(BigNumber.from(position.margin.toString()));
  const leverage = notional / margin;
  const underlyingTokenName = position.amm.underlyingToken.name || '';
  const settlementCashflow = positionInfo?.result?.settlementCashflow;

  const getHealthFactor = () => {
    if (positionInfo?.loading) {
      return 'loading...';
    } else {
      let healthColour = '';
      let text = '';

      switch (positionInfo?.result?.healthFactor) {
        case 1: {
          healthColour = colors.vzCustomRed1.base;
          text = 'DANGER';
          break;
        }
        case 2: {
          healthColour = colors.vzCustomYellow1.base;
          text = 'WARNING';
          break;
        }
        case 3: {
          healthColour = colors.vzCustomGreen2.base;
          text = 'HEALTHY';
          break;
        }
      }

      return <span style={{ color: healthColour }}>{text}</span>;
    }
  };

  const rows: React.ComponentProps<typeof SummaryPanel>['rows'] = [
    {
      label: 'NOTIONAL',
      value: `${formatCurrency(notional)} ${underlyingTokenName}`,
    },
    {
      label: 'LEVERAGE',
      value: `${formatCurrency(leverage)}x`,
    },
    {
      label: 'HEALTH FACTOR',
      value: positionInfo?.loading ? <Ellipsis /> : getHealthFactor(),
    },
    {
      label: 'CURRENT MARGIN',
      value: `${formatCurrency(margin)} ${underlyingTokenName}`,
      highlight: true,
    },
  ];

  if (formMode === SwapFormModes.ROLLOVER) {
    rows.push({
      label: 'CASHFLOW',
      value: !isUndefined(settlementCashflow) ? (
        `${formatCurrency(settlementCashflow)} ${underlyingTokenName}`
      ) : (
        <Ellipsis />
      ),
      highlight: true,
    });

    rows.push({
      label: 'NET BALANCE',
      value:
        positionInfo?.result && !isUndefined(settlementCashflow) ? (
          `${formatCurrency(settlementCashflow + margin)} ${underlyingTokenName}`
        ) : (
          <Ellipsis />
        ),
      highlight: true,
      bold: true,
    });
  }

  useEffect(() => {
    positionInfo?.call(position);
  }, [position]);

  return (
    <FormPanel noBackground>
      <Box sx={{ width: (theme) => theme.spacing(53), marginLeft: 'auto' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: (theme) => theme.spacing(6) }}
        >
          <PositionBadge
            size="small"
            variant="FC"
            text={currentPositionBadgeText}
            sx={{ display: 'inline-block', marginLeft: 0 }}
          />
        </Box>
        <SummaryPanel label="Position information" rows={rows} />
        <Button
          sx={{
            marginTop: (theme) => theme.spacing(6),
            flexGrow: 0,
          }}
          variant="dark-link"
          size="vs"
          onClick={onPortfolio}
          id={gaButtonId}
        >
          Portfolio
        </Button>
      </Box>
    </FormPanel>
  );
};
