import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import isNull from 'lodash/isNull';

import { Agents } from '@contexts';
import { Button } from '@components/atomic';
import { PoolField, MaturityInformation } from '@components/composite';
import { useAgent, useWallet } from '@hooks';
import { labels } from '../../constants';
import { VariableAPY, FixedAPR } from './components';
import { getRowButtonId } from '@utilities';
import { isNumber } from 'lodash';
import { AMM } from '@voltz-protocol/v2-sdk';
import { DateTime } from 'luxon';

export type AMMTableRowProps = {
  amm: AMM;
  index: number;
  onSelect: () => void;
};

const AMMTableRow: React.FunctionComponent<AMMTableRowProps> = ({ onSelect, amm, index }) => {
  // here we can pass AMM object that this row represents

  const wallet = useWallet();
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
          backgroundColor: `secondary.darken040`, // this affects the colour of the Pool table rows
          borderRadius: 2,
        };

      case 'darker':
        return {
          backgroundColor: `secondary.darken045`,
          borderRadius: 2,
        };

      default:
        return {};
    }
  };

  const handleClick = () => {
    if (isNull(wallet.account)) {
      wallet.setRequired(true);
    } else {
      onSelect();
    }
  };

  const resultVarApy = amm.variableApy;
  const resultFixedApr = amm.fixedApr;

  return (
    <TableRow key={index} sx={{ ...typeStyleOverrides() }}>
      {labels.map(([field, label]) => {
        if (field === 'variableApy') {
          return <VariableAPY variableApy={isNumber(resultVarApy) ? resultVarApy : undefined} />;
        }

        if (field === 'fixedApr') {
          return <FixedAPR fixedApr={isNumber(resultFixedApr) ? resultFixedApr : undefined} />;
        }

        const renderDisplay = () => {
          if (field === 'maturity') {
            return (
              <MaturityInformation
                label={label}
                startDate={DateTime.fromMillis(amm.termStartTimestamp * 1000)}
                endDate={DateTime.fromMillis(amm.termEndTimestamp * 1000)}
              />
            );
          }

          return <PoolField agent={agent} protocol={amm.protocol} isBorrowing={amm.isBorrowing} />;
        };

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}
      <TableCell align="center">
        <Button
          variant="contained"
          onClick={handleClick}
          id={getRowButtonId(agent === Agents.LIQUIDITY_PROVIDER, amm.protocol, amm.isBorrowing)}
          sx={{
            paddingTop: (theme) => theme.spacing(3),
            paddingBottom: (theme) => theme.spacing(3),
            paddingLeft: (theme) => theme.spacing(4),
            paddingRight: (theme) => theme.spacing(4),
            fontSize: 18,
            lineHeight: 1,
            boxShadow: 'none',
          }}
        >
          {agent === Agents.LIQUIDITY_PROVIDER ? 'PROVIDE LIQUIDITY' : 'TRADE'}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AMMTableRow;
