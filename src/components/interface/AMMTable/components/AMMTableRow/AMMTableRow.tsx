import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { data } from '@utilities';
import { Agents } from '@components/contexts';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { useAgent } from '@hooks';

export type AMMTableRowProps = {
  mode: data.Mode;
  datum: data.TableData;
  labels: [data.TableFields, string][];
  index: number;
  onSelectVamm: (vammId: string, positionId?: string) => void;
};

const AMMTableRow: React.FunctionComponent<AMMTableRowProps> = ({
  mode,
  datum,
  labels,
  index,
  onSelectVamm,
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
  const handleClick = () => {
    onSelectVamm(datum.id, datum.positionId);
  };

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

              case 'margin': {
                if (!datum.margin) {
                  return 'Margin';
                }

                return `$${datum.margin}`;
              }

              case 'notional': {
                if (!datum.notional) {
                  return 'Margin';
                }

                return `$${datum.notional}`;
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
          Hello
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AMMTableRow;
