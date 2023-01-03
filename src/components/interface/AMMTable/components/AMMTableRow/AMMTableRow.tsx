import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { SystemStyleObject, Theme } from '@mui/system';
import isNumber from 'lodash.isnumber';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';

import { Agents } from '../../../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../../../contexts/AMMContext/AMMContext';
import { useAMMsContext } from '../../../../../contexts/AMMsContext/AMMsContext';
import { useAgent } from '../../../../../hooks/useAgent';
import { useWallet } from '../../../../../hooks/useWallet';
import { colors } from '../../../../../theme/colors';
import { getRowButtonId } from '../../../../../utilities/googleAnalytics';
import { Button } from '../../../../atomic/Button/Button';
import { MaturityInformation } from '../../../../composite/MaturityInformation/MaturityInformation';
import { PoolField } from '../../../../composite/PoolField/PoolField';
import { labels } from '../../constants';
import { FixedAPR, VariableAPY } from './components';

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
        backgroundColor: colors.skyBlueCrayola7,
      };
    }

    switch (variant) {
      case 'main':
        return {
          backgroundColor: colors.lavenderWeb6, // this affects the colour of the Pool table rows
          borderRadius: 2,
        };

      case 'darker':
        return {
          backgroundColor: colors.lavenderWeb7,
          borderRadius: 2,
        };

      default:
        return {};
    }
  };

  const handleClick = () => {
    if (!wallet.account) {
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
            return <MaturityInformation endDate={endDate} label={label} startDate={startDate} />;
          }

          return <PoolField agent={agent} isBorrowing={isBorrowing} protocol={protocol} />;
        };

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}
      <TableCell align="center">
        <Button
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
          variant="contained"
          onClick={handleClick}
        >
          {agent === Agents.LIQUIDITY_PROVIDER ? 'PROVIDE LIQUIDITY' : 'TRADE'}
        </Button>
      </TableCell>
    </TableRow>
  );
};
