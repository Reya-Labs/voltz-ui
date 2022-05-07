import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import { Agents } from '@components/contexts';
import { Typography, Button } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { PositionTableDatum } from '../../types';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { PositionTableFields } from '../../types';
import { FixedAPR, Notional, HealthFactor, CurrentMargin, Fees } from './components';
import React, { useEffect } from 'react';
import { useAgent, useAMMContext } from '@hooks';
import { DateTime } from 'luxon';
import { isUndefined } from 'lodash';
import { Position } from '@voltz-protocol/v1-sdk';

export type PositionTableRowProps = {
  position: Position;
  datum: PositionTableDatum;
  index: number;
  onSelect: (mode: 'margin' | 'liquidity') => void;
  handleSettle: () => void;
};

const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  position,
  datum,
  index,
  onSelect,
  handleSettle
}) => {
  const { positionInfo } = useAMMContext();
  const { result: positionInfoResult, loading: loadingPositionInfo, call: callPositionInfo } = positionInfo;

  useEffect(() => {
    callPositionInfo({ position });
  }, [callPositionInfo, position]);
  
  const { agent } = useAgent();
  const variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'main';
  const typeStyleOverrides: SystemStyleObject<Theme> = {
    backgroundColor: `secondary.darken050`, // this affects the colour of the positions rows in the LP positions 
    borderRadius: 2
  };

  let labels: [PositionTableFields, string][];
  
  if (datum.agent === Agents.LIQUIDITY_PROVIDER) {
    labels = lpLabels;
  } else {
    labels = traderLabels;
  }

  return (
    <TableRow key={index} sx={{ ...typeStyleOverrides }}>
      {labels.map(([field, label]) => {
        const renderDisplay = () => {
          const token = datum.protocol.substring(1);

          if (field === 'maturity') {
            if (DateTime.now() >= datum.endDate) {
              if (datum.settled) {
                return <TableCell align="center">
                <Button variant="contained" disabled={datum.settled}>
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
                startDate={datum.startDate}
                endDate={datum.endDate}
              />
            ); 
            }            
          }

          if (field === 'accruedRates') {
            const renderValue = () => {
                if (loadingPositionInfo) {
                  return 'Loading...';
                }

                if (!positionInfoResult) {
                  return 'No data';
                }
                
              if (positionInfoResult.variableRateSinceLastSwap && positionInfoResult.fixedRateSinceLastSwap) {
                return `${positionInfoResult.fixedRateSinceLastSwap.toFixed(2)}% / ${positionInfoResult.variableRateSinceLastSwap.toFixed(2)}%`;
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

          // if (field === 'margin') {
          //   const renderValue = () => {
          //     if (loadingPositionInfo) {
          //       return 'Loading...';
          //     }

          //     if (!positionInfoResult) {
          //       return 'No data';
          //     }

          //     if (!datum.source) {
          //       return 'No source';
          //     }

          //     if (DateTime.now() <= datum.endDate) {
          //       if (positionInfoResult.liquidationThreshold && positionInfoResult.safetyThreshold) {
          //         if (positionInfoResult.margin < positionInfoResult.liquidationThreshold) {
          //           return 'DANGER';
          //         }
          //         else if (positionInfoResult.margin < positionInfoResult.safetyThreshold) {
          //           return 'WARNING';
          //         }
          //         else {
          //           return 'HEALTHY';
          //         }
          //       }
          //       else {
          //         return 'NO DISPLAY';
          //       }
          //     }
          //     else {
          //       if (datum.settled) {
          //         return 'NO DISPLAY';
          //       }
          //       else {
          //         return 'NO DISPLAY';
          //       }
          //     }
          //   };
          //   const status = renderValue();
          //   if (!status.includes('NO DISPLAY')) {
          //     return (
          //       <HealthFactor status={status} />
          //     );
          //   }
          // }

          // if (field === 'margin') {
          //   const renderValue = () => {
          //     if (loadingPositionInfo) {
          //       return 'Loading...';
          //     }

          //     if (!positionInfoResult) {
          //       return 'No data';
          //     }

          //     if (!datum.source) {
          //       return 'Cannot get source of position';
          //     }

          //     let accumulatedFees: string = "No data";
          //     if (!isUndefined(positionInfoResult.fees)) {
          //       accumulatedFees = `${positionInfoResult.fees.toFixed(2)} ${token}`;
          //     }

          //     if (datum.source.includes("FCM")) {
          //       return `FCM: no fees`;
          //     }

          //     return `${accumulatedFees}`;
          //   };
          //   return <Fees value={renderValue()} />;
          // }

          if (field === 'margin') {
            const renderValue = () => {
              if (loadingPositionInfo) {
                return 'Loading...';
              }

              if (!positionInfoResult) {
                return 'No data';
              }

              if (!datum.source) {
                return 'Cannot get source of position';
              }
              
              return `${positionInfoResult.margin.toFixed(2)} ${token} | cashflow: ${positionInfoResult.accruedCashflow.toFixed(2)} ${token}`;
            };
            return <CurrentMargin renderValue={renderValue} onSelect={ () => onSelect('margin') } />;
          }

          if (field === 'notional') {
            if (agent === Agents.LIQUIDITY_PROVIDER) {
              return <Notional notional={datum.notional.toFixed(2)} token={token} onSelect={() => onSelect('liquidity')} displayEditButton={agent !== Agents.LIQUIDITY_PROVIDER} />;
            }
            else {
              return <Typography variant="body2" label={label} sx={{ fontSize: 18 }}>
                {datum.notional.toFixed(2)} {token}
              </Typography>
            }
          }

          if (field === 'fixedApr') {
            return <FixedAPR />;
          }

          const getContent = () => {
            switch (field) {
              case 'pool':
                return (datum.source.includes("FCM")) ? "FCM : " + datum.protocol : datum.protocol;
              
              case 'fixedUpper':
                return `${datum.fixedUpper.toFixed(2)}%`;
              
              case 'fixedLower':
                return `${datum.fixedLower.toFixed(2)}%`;

              default:
                return null;
            }
          };


          if (field === 'fixedLower' || field === 'fixedUpper') {
            return (
              <Typography agentStyling variant="body2" label={label} sx={{fontSize: 18}}>
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

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}

    </TableRow>
  );
};

export default PositionTableRow;
