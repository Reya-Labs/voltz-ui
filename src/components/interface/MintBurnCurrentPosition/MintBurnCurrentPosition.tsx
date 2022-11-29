import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

import { MintBurnFormModes } from '../../../contexts/MintBurnFormContext/MintBurnFormContext';
import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { colors } from '../../../theme';
import { formatCurrency, formatNumber } from '../../../utilities/number';
import { Button } from '../../atomic/Button/Button';
import { Ellipsis } from '../../atomic/Ellipsis/Ellipsis';
import { PositionBadge } from '../../atomic/PositionBadge/PositionBadge';
import { SummaryPanel } from '../../atomic/SummaryPanel/SummaryPanel';
import { FormPanel } from '../FormPanel/FormPanel';

export type MintBurnCurrentPositionProps = {
  formMode: MintBurnFormModes;
  onPortfolio: () => void;
  notional: number;
  margin: number;
  underlyingTokenName: string;
  fixedRateUpper: number;
  fixedRateLower: number;
};

export const MintBurnCurrentPosition: React.FunctionComponent<MintBurnCurrentPositionProps> = ({
  formMode,
  onPortfolio,
  notional,
  margin,
  underlyingTokenName,
  fixedRateUpper,
  fixedRateLower,
}) => {
  const { positionInfo } = usePositionContext();

  const currentPositionBadgeText = `${
    positionInfo?.result?.beforeMaturity === false ? 'Previous' : 'Current'
  } position: LP`;
  const leverage = notional / margin;
  const fees = positionInfo?.result?.fees;
  const cashflow = positionInfo?.result?.settlementCashflow;

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
      label: 'FIXED LOW',
      value: `${formatNumber(fixedRateLower)}%`,
    },
    {
      label: 'FIXED HIGH',
      value: `${formatNumber(fixedRateUpper)}%`,
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

  if (formMode === MintBurnFormModes.ROLLOVER) {
    rows.push({
      label: 'CASHFLOW',
      value: !isUndefined(cashflow) ? (
        `${formatCurrency(cashflow)} ${underlyingTokenName}`
      ) : (
        <Ellipsis />
      ),
      highlight: true,
    });

    rows.push({
      label: 'FEES',
      value: !isUndefined(fees) ? `${formatCurrency(fees)} ${underlyingTokenName}` : <Ellipsis />,
      highlight: true,
    });

    rows.push({
      label: 'NET BALANCE',
      value:
        !isUndefined(cashflow) && !isUndefined(fees) ? (
          `${formatCurrency(cashflow + margin + fees)} ${underlyingTokenName}`
        ) : (
          <Ellipsis />
        ),
      highlight: true,
      bold: true,
    });
  }

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
          size="small"
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
