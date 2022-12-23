import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import isNumber from 'lodash.isnumber';
import React, { useEffect } from 'react';

import { Agents } from '../../../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../../../contexts/AMMContext/AMMContext';
import { useAgent } from '../../../../../hooks/useAgent';
import { SystemStyleObject, Theme } from '../../../../../theme';
import { isBorrowing } from '../../../../../utilities/isBorrowing';
import { formatNumber } from '../../../../../utilities/number';
import { Typography } from '../../../../atomic/Typography/Typography';
import { MaturityInformation } from '../../../../composite/MaturityInformation/MaturityInformation';
import { PoolField } from '../../../../composite/PoolField/PoolField';
import { lpLabels, traderLabels } from '../../constants';
import { AccruedRates, CurrentMargin, FixedAPR, Notional } from './components';

export type PositionTableRowProps = {
  position: Position;
  positionInfo: PositionInfo | undefined;
  index: number;
  onSelect: (mode: 'margin' | 'liquidity' | 'notional') => void;
};

export const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  position,
  positionInfo,
  index,
  onSelect,
}) => {
  const { agent } = useAgent();
  const labels = agent === Agents.LIQUIDITY_PROVIDER ? lpLabels : traderLabels;

  const { fixedApr } = useAMMContext();
  const { result: resultFixedApr, call: callFixedApr } = fixedApr;

  useEffect(() => {
    callFixedApr();
  }, [callFixedApr]);

  const typeStyleOverrides: SystemStyleObject<Theme> = {
    backgroundColor: `secondary.darken050`, // this affects the colour of the positions rows in the LP positions
    borderRadius: 2,
  };

  const handleEditMargin = () => {
    onSelect('margin');
  };

  const handleEditLPNotional = () => {
    onSelect('liquidity');
  };

  const renderTableCell = (field: string, label: string) => {
    const underlyingTokenName = position.amm.underlyingToken.name; // Introduced this so margin and notional show the correct underlying token unit e.g. Eth not stEth, USDC not aUSDC

    if (field === 'accruedRates') {
      return (
        <AccruedRates
          avgFixedRate={positionInfo?.fixedRateSinceLastSwap}
          positionType={position.positionType}
          variableRate={positionInfo?.variableRateSinceLastSwap}
        />
      );
    }

    if (field === 'fixedApr') {
      return <FixedAPR fixedApr={isNumber(resultFixedApr) ? resultFixedApr : undefined} />;
    }

    if (field === 'margin') {
      return (
        <CurrentMargin
          accruedCashflow={positionInfo?.accruedCashflow}
          isSettled={position.isSettled}
          margin={positionInfo?.margin}
          marginEdit={true}
          token={underlyingTokenName || ''}
          onSelect={agent === Agents.LIQUIDITY_PROVIDER ? handleEditMargin : undefined}
        />
      );
    }

    if (field === 'maturity') {
      return (
        <MaturityInformation
          endDate={position.amm.endDateTime}
          label="Maturity"
          startDate={position.amm.startDateTime}
        />
      );
    }

    if (field === 'notional') {
      return (
        <Notional
          notional={positionInfo?.notional}
          token={underlyingTokenName || ''}
          onEdit={agent === Agents.LIQUIDITY_PROVIDER ? handleEditLPNotional : undefined}
        />
      );
    }

    if (field === 'pool') {
      return (
        <PoolField
          agent={agent}
          isBorrowing={isBorrowing(position.amm.rateOracle.protocolId)}
          protocol={position.amm.protocol}
        />
      );
    }

    if (field === 'rateRange') {
      return (
        <Typography label={label} variant="h5">
          {formatNumber(position.fixedRateLower.toNumber())}% /{' '}
          {formatNumber(position.fixedRateUpper.toNumber())}%
        </Typography>
      );
    }

    return null;
  };

  return (
    <TableRow key={index} sx={{ ...typeStyleOverrides }}>
      {labels.map(([field, label]) => {
        return <TableCell key={field}>{renderTableCell(field, label)}</TableCell>;
      })}
    </TableRow>
  );
};
