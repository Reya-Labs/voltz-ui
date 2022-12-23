import Box from '@mui/material/Box';
import { Position } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React, { useEffect } from 'react';

import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { colors } from '../../../theme';
import { formatCurrency } from '../../../utilities/number';
import { Button } from '../../atomic/Button/Button';
import { Ellipsis } from '../../atomic/Ellipsis/Ellipsis';
import { PositionBadge } from '../../atomic/PositionBadge/PositionBadge';
import { SummaryPanel } from '../../atomic/SummaryPanel/SummaryPanel';
import { FormPanel } from '../FormPanel/FormPanel';
import { SwapFormModes } from '../SwapForm';

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
  const notional = positionInfo?.result?.notional;
  const margin = positionInfo?.result?.margin;
  const underlyingTokenName = position.amm.underlyingToken.name || '';
  const settlementCashflow = positionInfo?.result?.settlementCashflow;

  const getHealthFactor = () => {
    if (positionInfo?.loading) {
      return <Ellipsis />;
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
      value: isUndefined(notional) ? <Ellipsis /> : `${formatCurrency(notional)} ${underlyingTokenName}`,
    },
    {
      label: 'LEVERAGE',
      value: isUndefined(notional) || isUndefined(margin) ? <Ellipsis /> :`${formatCurrency(notional / margin)}x`,
    },
    {
      label: 'HEALTH FACTOR',
      value: positionInfo?.loading ? <Ellipsis /> : getHealthFactor(),
    },
    {
      label: 'CURRENT MARGIN',
      value: isUndefined(margin) ? <Ellipsis /> :`${formatCurrency(margin)} ${underlyingTokenName}`,
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
            sx={{ display: 'inline-block', marginLeft: 0 }}
            text={currentPositionBadgeText}
            variant="FC"
          />
        </Box>
        <SummaryPanel label="Position information" rows={rows} />
        <Button
          id={gaButtonId}
          size="vs"
          sx={{
            marginTop: (theme) => theme.spacing(6),
            flexGrow: 0,
          }}
          variant="dark-link"
          onClick={onPortfolio}
        >
          Portfolio
        </Button>
      </Box>
    </FormPanel>
  );
};
