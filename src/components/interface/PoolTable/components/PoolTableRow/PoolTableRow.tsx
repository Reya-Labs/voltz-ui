import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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

  return (
    <TableRow key={key}>
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
