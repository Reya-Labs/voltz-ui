import React, { useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import isNull from 'lodash/isNull';

import { Agents } from '@contexts';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { useAgent, useAMMContext, useWallet } from '@hooks';
import { AMMTableDatum } from '../../types';
import { labels } from '../../constants';
import { VariableAPY, FixedAPR } from './components';

import { ProgressBar } from '@components/composite';
import { Box } from '@mui/system';
import { isNumber } from 'lodash';

export type AMMTableRowProps = {
  datum: AMMTableDatum;
  index: number;
  onSelect: () => void;
};


// todo: panel component, adjust the styling
const AMMTableRow: React.FunctionComponent<AMMTableRowProps> = ({ datum, index, onSelect }) => {
  const wallet = useWallet();
  const { agent } = useAgent();
  const variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'main';

  const { ammCaps: { call: loadCap, loading: capLoading, result: cap } } = useAMMContext();

  useEffect(() => {
    loadCap();
  }, [loadCap]);
  
  // add object to sx prop
  // todo:
  // 
  // const anotherObject = {
  //   margin: ... 
  // }

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
          borderRadius: 2
        };

      case 'darker':
        return {
          backgroundColor: `secondary.darken045`,
          borderRadius: 2
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
      // todo: <TableRow key={index} sx={{...anotherObject,  ...typeStyleOverrides() }}>
      <TableRow key={index} sx={{...typeStyleOverrides() }}>
      {labels.map(([field, label]) => {
        if (field === 'variableApy') {
          return <VariableAPY />;
        }

        if (field === 'fixedApr') {
          return <FixedAPR />;
        }

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

          if (agent === Agents.LIQUIDITY_PROVIDER) {
            if (capLoading) {
              return (
                <Typography variant="h5" label={label}>
                  <ProgressBar
                    leftContent={datum.protocol}
                    rightContent={"Loading..."}
                    percentageComplete={0}
                  />
                </Typography>
              );
            }

            if (!isNumber(cap)) {
              return (
                <Typography variant="h5" label={label}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">{datum.protocol}</Typography>
                    </Box>
                  </Box>
                </Typography>);
            }

            return (
              <Typography variant="h5" label={label}>
                <ProgressBar
                  leftContent={datum.protocol}
                  rightContent={<>{cap.toFixed(2)}% CAP</>}
                  percentageComplete={cap}
                />
              </Typography>
            );
          }
          else {
            return (
              <Typography variant="h5" label={label}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{datum.protocol}</Typography>
                  </Box>
                </Box>
              </Typography>);
          }
        };

        return <TableCell key={field}>{renderDisplay()}</TableCell>;
      })}
      <TableCell align="center">
        <Button variant="contained" onClick={handleClick} sx={{
          paddingTop: (theme) => theme.spacing(3),
          paddingBottom: (theme) => theme.spacing(3),
          paddingLeft: (theme) => theme.spacing(4),
          paddingRight: (theme) => theme.spacing(4),
          fontSize: 18,
          lineHeight: 1,
          boxShadow: 'none',
        }}>
          {agent === Agents.LIQUIDITY_PROVIDER ? 'PROVIDE LIQUIDITY' : 'TRADE'}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AMMTableRow;
