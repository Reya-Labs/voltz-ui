import React, { useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import isNull from 'lodash/isNull';

import { Button } from '../../../../atomic/Button/Button';
import { PoolField } from '../../../../composite/PoolField/PoolField';
import { MaturityInformation } from '../../../../composite/MaturityInformation/MaturityInformation';
import { labels } from '../../constants';
import { VariableAPY, FixedAPR } from './components';
import isNumber from 'lodash/isNumber';
import { DateTime } from 'luxon';
import { useWallet } from '../../../../../hooks/useWallet';
import { useAMMsContext } from '../../../../../contexts/AMMsContext/AMMsContext';
import { Agents } from '../../../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../../../contexts/AMMContext/AMMContext';
import { useAgent } from '../../../../../hooks/useAgent';
import { getRowButtonId } from '../../../../../utilities/googleAnalytics';

export type AMMTableRowProps = {
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
  isBorrowing: boolean;
  onSelect: () => void;
};

export const AMMTableRow: React.FunctionComponent<AMMTableRowProps> = ({
  protocol,
  isBorrowing,
  startDate,
  endDate,
  onSelect,
}) => {
  const wallet = useWallet();
  const { agent } = useAgent();
  const variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'main';
  const { amm } = useAMMContext();

  const { variableApy, fixedApr } = useAMMsContext();
  const { result: resultFixedApr, call: callFixedApr } = fixedApr(amm);
  const { result: resultVarApy, call: callVarApy } = variableApy(amm);

  useEffect(() => {
    callVarApy();
  }, [callVarApy]);

  useEffect(() => {
    callFixedApr();
  }, [callFixedApr]);

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

  return (
    <TableRow sx={{ ...typeStyleOverrides() }}>
      {labels.map(([field, label]) => {
        if (field === 'variableApy') {
          return <VariableAPY variableApy={isNumber(resultVarApy) ? resultVarApy : undefined} />;
        }

        if (field === 'fixedApr') {
          return <FixedAPR fixedApr={isNumber(resultFixedApr) ? resultFixedApr : undefined} />;
        }

        const renderDisplay = () => {
          if (field === 'maturity') {
            return <MaturityInformation label={label} startDate={startDate} endDate={endDate} />;
          }

          return <PoolField agent={agent} protocol={protocol} isBorrowing={isBorrowing} />;
        };

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}
      <TableCell align="center">
        <Button
          variant="contained"
          onClick={handleClick}
          id={getRowButtonId(agent === Agents.LIQUIDITY_PROVIDER, protocol, isBorrowing)}
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
