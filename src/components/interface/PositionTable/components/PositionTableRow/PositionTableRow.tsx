import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { Agents } from '@components/contexts';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { useAgent } from '@hooks';
import { PositionTableDatum } from '../../types';
import { lpLabels } from '../../constants';
import { traderLabels } from '../../constants';
import { PositionTableFields } from '../../types';

export type PositionTableRowProps = {
  datum: PositionTableDatum;
  index: number;
  onSelect: () => void;
};

const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  datum,
  index,
  onSelect,
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
          backgroundColor: `secondary.darken040`,
        };

      case 'darker':
        return {
          backgroundColor: `secondary.darken050`,
        };

      default:
        return {};
    }
  };
  const handleClick = () => onSelect();

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
          if (field === 'maturity') {
            return (
              <MaturityInformation
                label={label}
                startDate={datum.startDate}
                endDate={datum.endDate}
              />
            );
          }

          const getContent = () => {
            switch (field) {
              case 'pool':
                return datum.protocol;

              case 'fixedApr':
                return `${datum.fixedApr.toFixed(2)}%`;

              case 'fixedTokenBalance':
                return `${datum.fixedTokenBalance.toFixed(2)}`;
              
              case 'fixedUpper':
                return `${datum.fixedUpper.toFixed(2)}%`;
              
              case 'fixedLower':
                return `${datum.fixedLower.toFixed(2)}%`;

              case 'notional':
                return datum.notional.toFixed(2);

              case 'margin':
                const token = datum.protocol.substring(1);
                return `${datum.margin.toFixed(2)} ${token}`;

              default:
                return null;
            }
          };


          // todo: optimise code below
          if (field === 'fixedLower' || field === 'fixedUpper') {
            return (
              <Typography agentStyling variant="body2" label={label}>
                {getContent()}
              </Typography>
            );
          } else {
            return (
              <Typography variant="body2" label={label}>
                {getContent()}
              </Typography>
            );
          }

        };

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}

      {/* todo: bring back when needed */}
      {/* <TableCell align="center">
        <Button variant="contained" onClick={handleClick}>
          Hello 
        </Button>
      </TableCell> */}
    </TableRow>
  );
};

export default PositionTableRow;
