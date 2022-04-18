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
import { EstimatedCashflow, FixedAPR, CurrentMargin } from './components';
import React from 'react';
import { useAgent } from '@hooks';



export type PositionTableRowProps = {
  datum: PositionTableDatum;
  index: number;
  onSelect: () => void;
  handleSubmit: () => void;
};

const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  datum,
  index,
  onSelect,
  handleSubmit
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
          borderRadius: 2
        };

      case 'darker':
        return {
          backgroundColor: `secondary.darken050`,
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
            return (
              <MaturityInformation
                label={label}
                startDate={datum.startDate}
                endDate={datum.endDate}
              />
            );
          }

          if (field === 'estimatedCashflow') {
            return <EstimatedCashflow tickLower={datum.fixedLower} tickUpper={datum.fixedUpper} token={token} />;
          }

          if (field === 'margin') {
            return <CurrentMargin tickLower={datum.fixedLower} tickUpper={datum.fixedUpper} token={token} onSelect={onSelect} displayEditButton={ agent !== Agents.LIQUIDITY_PROVIDER} />;
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

              case 'notional':
                return `${datum.notional.toFixed(2)} ${token}`;

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

      <TableCell align="center">
        <Button variant="contained" onClick={handleSubmit}>
          Settle 
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PositionTableRow;
