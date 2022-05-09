import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import { Agents } from '@components/contexts';
import { Typography, Button } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { PositionTableFields } from '../../types';
import { FixedAPR, Notional, CurrentMargin } from './components';
import React from 'react';
import { useAgent } from '@hooks';
import { DateTime } from 'luxon';
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

  const typeStyleOverrides: SystemStyleObject<Theme> = {
    backgroundColor: `secondary.darken050`, // this affects the colour of the positions rows in the LP positions 
    borderRadius: 2
  };

  let labels: [PositionTableFields, string][];
  
  if (agent === Agents.LIQUIDITY_PROVIDER) {
    labels = lpLabels;
  } else {
    labels = traderLabels;
  }

  return (
    <TableRow key={index} sx={{ ...typeStyleOverrides }}>
      {labels.map(([field, label]) => {
        const renderDisplay = () => {
          const token = position.amm.protocol.substring(1);

          if (field === 'maturity') {
            if (DateTime.now() >= position.amm.endDateTime) {
              if (position.isSettled) {
                return <TableCell align="center">
                <Button variant="contained" disabled={position.isSettled}>
                  <Typography agentStyling variant="body2">SETTLED</Typography>
                </Button>
              </TableCell>
              } else {
                return <TableCell align="center">
                  <Button variant="contained" onClick={handleSettle}>
                    <Typography agentStyling variant="body2">SETTLE</Typography>
                  </Button>
                </TableCell>
              }

            } else {

            return (
              <MaturityInformation
                label={label}
                startDate={position.amm.startDateTime}
                endDate={position.amm.endDateTime}
              />
            ); 
            }            
          }

          if (field === 'accruedRates') {
            const renderValue = () => {
            
              if (positionInfo?.variableRateSinceLastSwap && positionInfo?.fixedRateSinceLastSwap) {
                if (position.positionType === 1) {
                  return `${positionInfo?.fixedRateSinceLastSwap.toFixed(2)}% / ${positionInfo?.variableRateSinceLastSwap.toFixed(2)}%`;
                }
                else {
                  return `${positionInfo?.variableRateSinceLastSwap.toFixed(2)}% / ${positionInfo?.fixedRateSinceLastSwap.toFixed(2)}%`;
                }
                
              }
              else {
                return `- / -`;
              }
            }
          
            return (<TableCell align="center">
              <Typography variant="body2" label={label} sx={{ fontSize: 18 }}>
                {renderValue()}
              </Typography>
            </TableCell>);
          }

          if (field === 'margin') {
            return <CurrentMargin accruedCashflow={positionInfo?.accruedCashflow} margin={positionInfo?.margin} token={token} onSelect={ () => onSelect('margin') } />;
          }

          if (field === 'notional') {
            if (agent === Agents.LIQUIDITY_PROVIDER) {
              return <Notional notional={position.notional.toFixed(2)} token={token} onSelect={() => onSelect('liquidity')} displayEditButton={agent !== Agents.LIQUIDITY_PROVIDER} />;
            }
            else {
              return <Typography variant="body2" label={label} sx={{ fontSize: 18 }}>
                {Math.abs(position.effectiveVariableTokenBalance).toFixed(2)} {token}
              </Typography>
            }
          }

          if (field === 'fixedApr') {
            return <FixedAPR />;
          }

          const getContent = () => {
            switch (field) {
              case 'pool':
                return (position.source.includes("FCM")) ? "FCM : " + position.amm.protocol : position.amm.protocol;
              
              case 'rateRange':
                return `${position.fixedRateLower.toNumber().toFixed(2)}% / ${position.fixedRateUpper.toNumber().toFixed(2)}%`;

              default:
                return null;
            }
          };


          if (field === 'rateRange') {
            return (
              <Typography variant="body2" label={label} sx={{fontSize: 18}}>
                {getContent()}
              </Typography>
            );
          } else {
            return (
              <Typography variant="body2" label={label} sx={{fontSize: 18}}>
                {getContent()}
              </Typography>
            );
          }

        };

        // console.log("key:", field);
        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}

    </TableRow>
  );
};

export default PositionTableRow;
