import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import React, { useMemo } from 'react';

import { Agents } from '../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../contexts/AMMContext/AMMContext';
import { Typography } from '../../atomic/Typography/Typography';
import { IconLabel } from '../IconLabel/IconLabel';
import { ReactComponent as Aave } from '../PoolField/aave-icon.svg';
import { ReactComponent as Compound } from '../PoolField/compound-icon.svg';
import { ReactComponent as DAI } from '../PoolField/dai-icon.svg';
import { ReactComponent as ETH } from '../PoolField/eth-icon.svg';
import { ReactComponent as GLP } from '../PoolField/glp-icon.svg';
import { ReactComponent as Lido } from '../PoolField/lido-icon.svg';
import { ReactComponent as Rocket } from '../PoolField/rocket-icon.svg';
import { ReactComponent as USDC } from '../PoolField/usdc-icon.svg';
import { ReactComponent as USDT } from '../PoolField/usdt-icon.svg';
import { FixedAPR, MaturityEndDate, VariableAPY } from './components';

export type ProtocolInformationProps = {
  protocol?: string;
  isBorrowForm?: boolean;
  endDate?: DateTime | undefined;
  variableApy?: number;
  fixedApr?: number;
  isRollover?: boolean;
  isSettle?: boolean;
};

export const ProtocolInformation: React.FunctionComponent<ProtocolInformationProps> = ({
  protocol,
  isBorrowForm,
  endDate,
  variableApy,
  fixedApr,
  isRollover,
  isSettle,
}) => {
  const { amm } = useAMMContext();
  const getPoolLabel = () => (
    <>
      <Box component="span" sx={{ color: '#9B97AD' }}>
        POOL
      </Box>
      {amm && amm.market.tags.isAaveV3 && (
        <Box component="span" sx={{ color: '#FF4AA9' }}>
          {'  '}
          <strong>AAVE V3</strong>
        </Box>
      )}
      {amm && amm.market.tags.isBorrowing && (
        <Box component="span" sx={{ color: '#FF4AA9' }}>
          {'  '}
          <strong>BORROWING</strong>
        </Box>
      )}
    </>
  );

  const protocolIconMemo = useMemo(() => {
    if (protocol) {
      const prefix = protocol[0];
      switch (prefix) {
        case 'c':
          return ['Compound', <Compound key="Compound" height="38" width="38" />];
        case 'a':
          return ['Aave', <Aave key="Aave" height="38" width="38" />];
        case 's':
          return ['Lido', <Lido key="Lido" height="38" width="38" />];
        case 'r':
          return ['Rocket', <Rocket key="Rocket" height="38" width="38" />];
        case 'g':
          return ['GMX:GLP', <GLP key="GLP" height="38" width="38" />];
        default:
          return ['', ''];
      }
    }
    return ['', ''];
  }, [protocol]);

  const tokenIconMemo = useMemo(() => {
    if (protocol) {
      const token = protocol[0] === 's' ? protocol.substring(2) : protocol.substring(1);
      switch (token) {
        case 'DAI':
          return ['DAI', <DAI key="DAI" height="38" width="38" />];
        case 'USDC':
          return ['USDC', <USDC key="USDC" height="38" width="38" />];
        case 'ETH':
          return ['ETH', <ETH key="ETH" height="38" width="38" />];
        case 'USDT':
          return ['USDT', <USDT key="USDT" height="38" width="38" />];
        default:
          return ['', ''];
      }
    }
    return ['', ''];
  }, [protocol]);

  const protocolInfo = protocolIconMemo;
  const tokenInfo = tokenIconMemo;

  const isSTETHOrRETH = protocol === 'stETH' || protocol === 'rETH';
  return (
    <Box
      sx={{
        marginBottom: (theme) => theme.spacing(2),
        '.MuiFormControl-root': {
          paddingRight: 3,
          '&:last-child': {
            paddingRight: 0,
          },
        },
      }}
    >
      <Typography
        label={
          <IconLabel
            icon="information-circle"
            info={
              isSTETHOrRETH
                ? `Trade rates in the ${protocol} pool by depositing ETH as margin. ${protocol} cannot be used as a form of margin until post-merge.`
                : ''
            }
            label={getPoolLabel()}
            removeIcon={!isSTETHOrRETH}
          />
        }
        sx={{
          fontSize: 32,
          textTransform: 'uppercase',
          verticalAlign: 'top',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: '110%',
          marginBottom: (theme) => theme.spacing(4),
        }}
        variant="body2"
      >
        {protocolInfo && tokenInfo && (
          <Box sx={{ display: 'flex', alignContent: 'center' }}>
            <Box sx={{ marginRight: (theme) => theme.spacing(-2) }}> {protocolInfo[1]}</Box>
            <Box>{tokenInfo[1]}</Box>
            &thinsp;{protocolInfo[0]}&thinsp;-&thinsp;{tokenInfo[0]}
          </Box>
        )}
      </Typography>

      {(isRollover || isSettle) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '56%' }}>
          <Typography label={'STATUS'} variant="h3" agentStyling>
            {isRollover ? 'ROLLOVER' : 'SETTLING'}
          </Typography>
        </Box>
      )}

      {!isRollover && !isSettle && isBorrowForm !== true && (
        <Box sx={{ display: 'flex' }}>
          <FixedAPR fixedApr={fixedApr} />
          <VariableAPY variableApy={variableApy} />
        </Box>
      )}
      {!isRollover && !isSettle && isBorrowForm === true && (
        <Box display="flex">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '56%',
              marginRight: (theme) => theme.spacing(8),
            }}
          >
            <FixedAPR agent={Agents.FIXED_TRADER} fixedApr={fixedApr} />
            <VariableAPY agent={Agents.VARIABLE_TRADER} variableApy={variableApy} />
          </Box>
          <MaturityEndDate endDate={endDate} />
        </Box>
      )}
    </Box>
  );
};
