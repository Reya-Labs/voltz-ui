import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { positions, SystemStyleObject, Theme } from '@mui/system';
import { Agents } from '@components/contexts';
import { Typography, Button } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { PositionTableDatum } from '../../types';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { PositionTableFields } from '../../types';
import { EstimatedCashflow, FixedAPR, CurrentMargin, Notional } from './components';
import React from 'react';
import { useAgent } from '@hooks';
import { DateTime } from 'luxon';



export type PositionTableRowProps = {
  datum: PositionTableDatum;
  index: number;
  onSelect: () => void;
  handleSettle: () => void;
};

const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  datum,
  index,
  onSelect,
  handleSettle
}) => {
  const { agent } = useAgent();
  const variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'main';
  const typeStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!variant) {
      return {
        backgroundColor: `primary.dark`,
      };
    }

    switch (variant) {
      case 'main':
        return {
          backgroundColor: `secondary.darken040`, // this affects the colour of the position rows in the trader positions
          borderRadius: 2
        };

      case 'darker':
        return {
          backgroundColor: `secondary.darken050`, // this affects the colour of the positions rows in the LP positions 
          borderRadius: 2
        };

      default:
        return {};
    }
  };

  let labels: [PositionTableFields, string][];
  
  if (datum.agent === Agents.LIQUIDITY_PROVIDER) {
    labels = lpLabels;
  } else {
    labels = traderLabels;
  }

  return (
    <TableRow key={index} sx={{ ...typeStyleOverrides() }}>
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
          if (field === 'estimatedCashflow') {
            return <EstimatedCashflow tickLower={datum.fixedLower} tickUpper={datum.fixedUpper} token={token} />;
          }
          // The below lines are responsible for the current margin column of the LP positions: this component contains the Edit button as well. 
          if (field === 'margin') {
            return <CurrentMargin tickLower={datum.fixedLower} tickUpper={datum.fixedUpper} token={token} onSelect={onSelect} displayEditButton={ agent !== Agents.LIQUIDITY_PROVIDER} />;
          }

          if (field === 'notional') {
            return <Notional notional={datum.notional.toFixed(2)} token={token} onSelect={onSelect} displayEditButton={ agent !== Agents.LIQUIDITY_PROVIDER} />;
          }

          if (field === 'fixedApr') {
            return <FixedAPR />;
          }

          const getContent = () => {
            switch (field) {
              case 'pool':
                return datum.protocol;
              
              case 'fixedUpper':
                return `${datum.fixedUpper.toFixed(2)}%`;
              
              case 'fixedLower':
                return `${datum.fixedLower.toFixed(2)}%`;

              // case 'notional':
              //   return `${datum.notional.toFixed(2)} ${token}`;

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
