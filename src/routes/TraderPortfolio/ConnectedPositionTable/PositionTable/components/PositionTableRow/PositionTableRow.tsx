import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Position } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { MaturityInformation } from '../../../../../../components/composite/MaturityInformation/MaturityInformation';
import { PoolField } from '../../../../../../components/composite/PoolField/PoolField';
import { Agents } from '../../../../../../contexts/AgentContext/types';
import { SystemStyleObject, Theme } from '../../../../../../theme';
import { isBorrowing } from '../../../../../../utilities/amm';
import { traderLabels } from '../../constants';
import { AccruedRates, CurrentMargin, Notional } from './components';

export type PositionTableRowProps = {
  position: Position;
  index: number;
  isAaveV3: boolean;
};

export const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  position,
  index,
  isAaveV3,
}) => {
  const labels = traderLabels;

  const typeStyleOverrides: SystemStyleObject<Theme> = {
    backgroundColor: `secondary.darken050`, // this affects the colour of the positions rows in the LP positions
    borderRadius: 2,
  };

  const renderTableCell = (field: string) => {
    const underlyingTokenName = position.amm.underlyingToken.name; // Introduced this so margin and notional show the correct underlying token unit e.g. Eth not stEth, USDC not aUSDC

    if (field === 'accruedRates') {
      return (
        <AccruedRates payingRate={position.payingRate} receivingRate={position.receivingRate} />
      );
    }

    if (field === 'margin') {
      return (
        <CurrentMargin
          accruedCashflow={position.accruedCashflow}
          isSettled={position.isSettled}
          margin={position.margin}
          marginEdit={true}
          token={underlyingTokenName || ''}
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
      return <Notional notional={position.notional} token={underlyingTokenName || ''} />;
    }

    if (field === 'pool') {
      return (
        <PoolField
          agent={Agents.FIXED_TRADER}
          isAaveV3={isAaveV3}
          isBorrowing={isBorrowing(position.amm.rateOracle.protocolId)}
          protocol={position.amm.protocol}
        />
      );
    }

    return null;
  };

  return (
    <TableRow key={index} sx={{ ...typeStyleOverrides }}>
      {labels.map(([field]) => {
        return <TableCell key={field}>{renderTableCell(field)}</TableCell>;
      })}
    </TableRow>
  );
};
