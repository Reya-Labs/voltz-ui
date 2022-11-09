import Box from '@mui/material/Box';
import isUndefined from 'lodash.isundefined';
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
  notional?: number;
  margin?: number;
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
  const { position } = usePositionContext();

  const currentPositionBadgeText = `${
    position?.isPoolMatured === true ? 'Previous' : 'Current'
  } position: LP`;
  const fees = position?.fees;
  const cashflow = position?.settlementCashflow;

  const getHealthFactor = () => {
    if (!position?.initialized) {
      return 'loading...';
    } else {
      let healthColour = '';
      let text = '';

      switch (position?.healthFactor) {
        case 1: {
          healthColour = colors.wildStrawberry;
          text = 'DANGER';
          break;
        }
        case 2: {
          healthColour = colors.orangeYellow;
          text = 'WARNING';
          break;
        }
        case 3: {
          healthColour = colors.skyBlueCrayola;
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
      value: isUndefined(notional) ? (
        <Ellipsis />
      ) : (
        `${formatCurrency(notional)} ${underlyingTokenName}`
      ),
    },
    {
      label: 'LEVERAGE',
      value:
        isUndefined(notional) || isUndefined(margin) ? (
          <Ellipsis />
        ) : (
          `${formatCurrency(notional / margin)}x`
        ),
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
      value: !position?.initialized ? <Ellipsis /> : getHealthFactor(),
    },
    {
      label: 'CURRENT MARGIN',
      value: isUndefined(margin) ? (
        <Ellipsis />
      ) : (
        `${formatCurrency(margin)} ${underlyingTokenName}`
      ),
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
        !isUndefined(cashflow) && !isUndefined(fees) && !isUndefined(margin) ? (
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
