import React, { useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@theme';
import { Agents, useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import { PoolField } from '@components/composite';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { FixedAPR, Notional, CurrentMargin, Maturity, AccruedRates } from './components';
import { useAgent } from '@hooks';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import { formatNumber, isBorrowing } from '@utilities';

export type PositionTableRowProps = {
  position: Position;
  positionInfo: PositionInfo | undefined;
  index: number;
  onSelect: (mode: 'margin' | 'liquidity' | 'notional') => void;
};

const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  position,
  positionInfo,
  index,
  onSelect
}) => {
  const { agent } = useAgent();
  const labels = agent === Agents.LIQUIDITY_PROVIDER ? lpLabels : traderLabels;

  const { ammCaps: { call: loadCap, loading: capLoading, result: cap } } = useAMMContext();

  useEffect(() => {
    loadCap();
  }, [loadCap]);

  const typeStyleOverrides: SystemStyleObject<Theme> = {
    backgroundColor: `secondary.darken050`, // this affects the colour of the positions rows in the LP positions 
    borderRadius: 2 
  };

  const handleEditMargin = () => {
    onSelect('margin');
  }

  const handleEditNotional = () => {
    onSelect('notional');
  }

  const handleEditLPNotional = () => {
    onSelect('liquidity');
  }

  const renderTableCell = (field: string, label: string) => {
    const underlyingTokenName = position.amm.underlyingToken.name; // Introduced this so margin and notional show the correct underlying token unit e.g. Eth not stEth, USDC not aUSDC
    
    if (field === 'accruedRates') {
      return (<AccruedRates position={position} positionInfo={positionInfo} />);
    }

    if (field === 'fixedApr') {
      return <FixedAPR />;
    }

    if (field === 'margin') {
      return (
        <CurrentMargin 
          accruedCashflow={(agent === Agents.LIQUIDITY_PROVIDER) ? undefined : (positionInfo?.accruedCashflow || 0)} 
          margin={positionInfo?.margin} 
          token={position.source.includes("FCM") ? position.amm.protocol : underlyingTokenName || ''} 
          onSelect={handleEditMargin} 
          marginEdit={position.source.includes("FCM") ? false : true}
        />
      );
    }

    if (field === 'maturity') {
      return <Maturity position={position} />
    }

    if (field === 'notional') {
      return (
        <Notional 
          notional={agent === Agents.LIQUIDITY_PROVIDER ? formatNumber(position.notional) : formatNumber(Math.abs(position.effectiveVariableTokenBalance))} 
          token={underlyingTokenName || ''}
          onEdit={agent === Agents.LIQUIDITY_PROVIDER ? handleEditLPNotional : handleEditNotional}
        />
      )
    }
    
    if (field === 'pool') {

      return (<PoolField agent={agent} protocol={position.amm.protocol} isBorrowing={isBorrowing(position.amm.rateOracle.protocolId)} capLoading={capLoading} cap={cap}/>)      
    }

    if (field === 'rateRange') {
      return (
        <Typography variant="h5" label={label}>
          {formatNumber(position.fixedRateLower.toNumber())}% / {formatNumber(position.fixedRateUpper.toNumber())}%
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
