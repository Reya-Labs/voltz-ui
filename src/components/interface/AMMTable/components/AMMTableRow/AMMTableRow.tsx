import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { Agents } from '@components/contexts';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { useAgent } from '@hooks';
import { AMMTableDatum } from '../../types';
import { labels } from '../../constants';

export type AMMTableRowProps = {
  datum: AMMTableDatum;
  index: number;
  onSelect: () => void;
};

const AMMTableRow: React.FunctionComponent<AMMTableRowProps> = ({ datum, index, onSelect }) => {
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
              case 'protocol':
                return datum.protocol;

              case 'fixedApr':
                return `${datum.fixedApr}%`;

              case 'variableApr': {
                if (!datum.variableApr) {
                  return 'Variable APR';
                }

                return `${datum.variableApr}%`;
              }

              default:
                return null;
            }
          };

          return (
            <Typography variant="body2" label={label}>
              {getContent()}
            </Typography>
          );
        };

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}
      <TableCell align="center">
        <Button variant="contained" onClick={handleClick}>
          {agent === Agents.LIQUIDITY_PROVIDER ? 'PROVIDE LIQUIDITY' : 'SWAP'}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AMMTableRow;
