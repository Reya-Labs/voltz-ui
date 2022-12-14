import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import isNumber from 'lodash.isnumber';
import React, { useEffect } from 'react';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import { MaturityInformation } from '../../../../../../components/composite/MaturityInformation/MaturityInformation';
import { PoolField } from '../../../../../../components/composite/PoolField/PoolField';
import { Agents } from '../../../../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../../../../contexts/AMMContext/AMMContext';
import { SystemStyleObject, Theme } from '../../../../../../theme';
import { isBorrowing } from '../../../../../../utilities/isBorrowing';
import { formatNumber } from '../../../../../../utilities/number';
import { lpLabels } from '../../constants';
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
          accruedCashflow={undefined}
          isSettled={position.isSettled}
          margin={positionInfo?.margin}
          marginEdit={true}
          token={underlyingTokenName || ''}
          onSelect={handleEditMargin}
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
          notional={formatNumber(position.notional)}
          token={underlyingTokenName || ''}
          onEdit={handleEditLPNotional}
        />
      );
    }

    if (field === 'pool') {
      return (
        <PoolField
          agent={Agents.LIQUIDITY_PROVIDER}
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
      {lpLabels.map(([field, label]) => {
        return <TableCell key={field}>{renderTableCell(field, label)}</TableCell>;
      })}
    </TableRow>
  );
};
