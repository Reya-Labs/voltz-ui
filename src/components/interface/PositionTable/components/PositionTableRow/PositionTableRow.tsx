import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import { Agents } from '@components/contexts';
import { Typography } from '@components/atomic';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { FixedAPR, Notional, CurrentMargin, Maturity, AccruedRates } from './components';
import React from 'react';
import { useAgent } from '@hooks';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';

export type PositionTableRowProps = {
  position: Position;
  positionInfo?: PositionInfo;
  index: number;
  onSelect: (mode: 'margin' | 'liquidity') => void;
  handleSettle: () => void;
};

const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  position,
  positionInfo,
  index,
  onSelect,
  handleSettle
}) => {
  const { agent } = useAgent();
  const labels = agent === Agents.LIQUIDITY_PROVIDER ? lpLabels : traderLabels;

  const typeStyleOverrides: SystemStyleObject<Theme> = {
    backgroundColor: `secondary.darken050`, // this affects the colour of the positions rows in the LP positions 
    borderRadius: 2
  };

  const handleEditMargin = () => {
    onSelect('margin');
  }

  const handleEditNotional = () => {
    onSelect('liquidity');
  }

  const renderTableCell = (field: string, label: string) => {
    const token = position.amm.protocol.substring(1);
    
    if (field === 'accruedRates') {
      return (<AccruedRates position={position} positionInfo={positionInfo} />);
    }

    if (field === 'fixedApr') {
      return <FixedAPR />;
    }

    if (field === 'margin') {
      return (
        <CurrentMargin 
          accruedCashflow={positionInfo?.accruedCashflow} 
          margin={positionInfo?.margin} 
          token={token} 
          onSelect={handleEditMargin} 
        />
      );
    }

    if (field === 'maturity') {
      return <Maturity onSettle={handleSettle} position={position} />
    }

    if (field === 'notional') {
      return (
        <Notional 
          notional={agent === Agents.LIQUIDITY_PROVIDER ? position.notional.toFixed(2) : Math.abs(position.effectiveVariableTokenBalance).toFixed(2)} 
          token={token}
          onEdit={agent === Agents.LIQUIDITY_PROVIDER ? handleEditNotional : undefined}
        />
      )
    }
    
    if (field === 'pool') {
      return (
        <Typography variant="h5" label={label}>
          {position.source.includes("FCM") ? `FCM : ${position.amm.protocol}` : position.amm.protocol}
        </Typography>
      );
    }

    if (field === 'rateRange') {
      return (
        <Typography variant="h5" label={label}>
          {position.fixedRateLower.toNumber().toFixed(2)}% / {position.fixedRateUpper.toNumber().toFixed(2)}%
        </Typography>
      );
    }

    return null;
  };

  return (
    <TableRow key={index} sx={{ ...typeStyleOverrides }}>
      {labels.map(([field, label]) => {
        return (
          <TableCell key={field}>
            {renderTableCell(field, label)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default PositionTableRow;
