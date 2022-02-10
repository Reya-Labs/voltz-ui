import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { Agents } from '@components/contexts';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { useAgent } from '@hooks';
import { Mode, TableData, TableFields } from '../../types';

export type PoolTableRowProps = {
  mode: Mode;
  datum: TableData;
  labels: [TableFields, string][];
};

const PoolTableRow: React.FunctionComponent<PoolTableRowProps> = ({ mode, datum, labels }) => {
  const { agent } = useAgent();
  const key = 0;
  const variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'main';
  const commonOverrides: SystemStyleObject<Theme> = {
    '& .MuiTableCell-root': {
      borderColor: 'transparent',
      paddingRight: (theme) => theme.spacing(4),
      paddingLeft: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(2),
      paddingBottom: (theme) => theme.spacing(1),
      '&:first-of-type': {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      '&:last-of-type': {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
  };
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

  return (
    <TableRow key={key} sx={{ ...commonOverrides, ...typeStyleOverrides() }}>
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
        <Button variant="contained">Hello</Button>
      </TableCell>
    </TableRow>
  );
};

export default PoolTableRow;
