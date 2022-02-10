import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { AgentProps, Agents } from '@theme';
import { MaturityInformation } from '@components/composite';
import { Mode, TableData, TableFields } from '../../types';

export type PoolTableRowProps = AgentProps & {
  mode: Mode;
  datum: TableData;
  labels: [TableFields, string][];
};

const PoolTableRow: React.FunctionComponent<PoolTableRowProps> = ({
  agent,
  mode,
  datum,
  labels,
}) => {
  const key = 0;
  const variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'main';
  const commonOverrides: SystemStyleObject<Theme> = {
    '& .MuiTableCell-root': {
      borderColor: 'transparent',
      padding: (theme) => theme.spacing(4),
      '&:first-of-type': {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
      '&:last-of-type': {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
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
      {labels.map(([field, _label]) => {
        const renderDisplay = () => {
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

            case 'maturity':
              return <MaturityInformation startDate={datum.startDate} endDate={datum.endDate} />;

            default:
              return null;
          }
        };

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}
    </TableRow>
  );
};

export default PoolTableRow;
