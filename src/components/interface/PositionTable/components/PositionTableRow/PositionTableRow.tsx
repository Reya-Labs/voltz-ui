import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import { Agents } from '@components/contexts';
import { Typography } from '@components/atomic';
import { ProgressBar } from '@components/composite';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { FixedAPR, Notional, CurrentMargin, Maturity, AccruedRates } from './components';
import React, { useEffect } from 'react';
import { useAgent, useAMMContext } from '@hooks';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import { Box } from '@mui/system';

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
    onSelect('liquidity');
  }

  const renderTableCell = (field: string, label: string) => {
    const token = position.amm.protocol;
    
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
          token={position.source.includes("FCM") ? position.amm.protocol : token} 
          onSelect={handleEditMargin} 
          marginEdit={position.source.includes("FCM") ? false : true}
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

      if (agent === Agents.LIQUIDITY_PROVIDER) {
        if (capLoading) {
          return (
            <Typography variant="h5" label={label}>
              <ProgressBar
                leftContent={position.amm.protocol}
                rightContent={"Loading..."}
                percentageComplete={0}
              />
            </Typography>
          );
        }

        if (!cap) {
          return (
            <Typography variant="h5" label={label}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{position.amm.protocol}</Typography>
                </Box>
              </Box>
            </Typography>);
        }

        return (
          <Typography variant="h5" label={label}>
            <ProgressBar
              leftContent={position.amm.protocol}
              rightContent={<>{cap.toFixed(2)}% CAP</>}
              percentageComplete={cap}
            />
          </Typography>
        );
      }
      else {
        return (
          <Typography variant="h5" label={label}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{position.amm.protocol}</Typography>
              </Box>
            </Box>
          </Typography>);
      }
      
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
