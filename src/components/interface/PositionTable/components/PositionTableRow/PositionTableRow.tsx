import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { Agents } from '@components/contexts';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { useAgent } from '@hooks';
import { PositionTableDatum } from '../../types';
import { labels } from '../../constants';

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

export default PositionTableRow;
