import React, { useEffect, useRef, useState } from 'react';

import { SelectInput, Typography } from '@components/atomic';
import { MaskedIntegerField } from '@components/composite';
import { IconLabel } from '@components/composite';
import Box from '@mui/material/Box';
import { colors } from '@theme';
import { formatNumber, notFormatted, stringToBigFloat, toUSFormat } from '@utilities';
import { isUndefined } from 'lodash';

interface ExpectedAPYProps {
  expectedApy?: number;
  expectedCashflow?: number;
  userSimulatedVariableApy?: number;
  onChangeUserSimulatedVariableApy: (value: number, resetToDefault?: boolean) => void;
  userSimulatedVariableApyUpdated: boolean;
}

export const ExpectedAPY = ({ expectedApy, expectedCashflow, userSimulatedVariableApy, onChangeUserSimulatedVariableApy, userSimulatedVariableApyUpdated }:ExpectedAPYProps) => {
  const delay = 1000;

  const [userInput, setUserInput] = useState(!isUndefined(userSimulatedVariableApy) ? formatNumber(userSimulatedVariableApy, 0,2) : undefined);
  const timer = useRef<number>();

  useEffect(() => {
    const formatted = !isUndefined(userSimulatedVariableApy) ? formatNumber(userSimulatedVariableApy, 0,2) : undefined
    setUserInput(formatted);    
  }, [userSimulatedVariableApy, userSimulatedVariableApyUpdated])

  const handleChangeInput = (inputVal: string | undefined) => {
    if (inputVal) {
      const usFormatted = toUSFormat(inputVal);
      const newValue = usFormatted ? stringToBigFloat(usFormatted) : NaN;
      if(!isNaN(newValue)) {
        setUserInput(inputVal);
        window.clearInterval(timer.current);
        timer.current = window.setTimeout(() => onChangeUserSimulatedVariableApy(newValue), delay);
      }
    } else {
      setUserInput("");
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChangeUserSimulatedVariableApy(0, true), delay * 2);
    }
  };

  const formatExpectedApy = (value: number | undefined) => {
    if (value) {
      if (value > 1000) {
        return '>1,000%'
      }
      if (value < -1000) {
        return '<-1,000%'
      }
      return formatNumber(value, 0, 2)+'%';
    }
    return '---';
  }

  const formatCashflow = (value: number | undefined) => {
    if (value) {
      if (Math.abs(value) >= 1000000000 - 0.5) {
        return formatNumber(value / 1000000000, 0, 3)+'bn';
      }
      if (Math.abs(value) >= 1000000 - 0.5) {
        return formatNumber(value, 0, 0);
      }
      if (Math.abs(value) >= 100000 - 0.5) {
        return formatNumber(value, 0, 2);
      }
      return formatNumber(value, 0, 4);
    }

    return '---';
  }

  return (
    <>
      <Box sx={{ marginBottom: (theme) => theme.spacing(4) }}>
        <Typography 
          label={
            <Typography variant="h4">
              <IconLabel 
                label="APY Calculator" 
                icon="information-circle" 
                info="TBD" 
              />
            </Typography>
          }
          variant='body1' 
          sx={{ color: colors.lavenderWeb.darken020, fontSize: '14px' }}
        >
          Generate an expected APY for a given variable APY between now and the end of the pool. The expected APY factors in pool conditions and the details of your position.
        </Typography>
      </Box>
      <Box sx = {{
          display: 'flex',
          flexDirection: 'row',
          borderRadius: '8px', 
          background: colors.lavenderWeb.darken045,
          maxWidth: '340px',
          width: '340px',
        }}
      >
        <Box sx={{
          // display: 'inline-block',
          padding: (theme) => theme.spacing(4), 
          marginRight: (theme) => theme.spacing(16),
          maxWidth: '80px',
          width: '80px',
          marginTop: '4px'
        }}>
          <MaskedIntegerField
            allowDecimals
            dynamic
            inputSize="small"
            label={<IconLabel label={'Expected Variable APY'} icon="information-circle" info="Select the percentage of the variable APY between now and the end of the pool that you would like to simulate." />}
            onChange={handleChangeInput}
            suffix='%'
            suffixPadding={0}
            value={notFormatted(userInput)}
          />
        </Box>
        <Box sx={{ 
          // display: 'inline-block',
          padding: (theme) => theme.spacing(4),
          maxWidth: '100px',
          width: '100px'
        }}>
          <Typography
            variant="body2"
            fontSize={24}
            label={<IconLabel label="Expected Casfhlow" icon="information-circle" info="The cashflow you would get in a scenario in which the variable APY has the selected value until the pool's maturity" />}
            sx={{
              marginTop: '-4px'
            }}
          >
            {formatCashflow(expectedCashflow)}
          </Typography>
          <Typography
              variant="body2"
              fontSize={12}
              sx={{
                color: colors.lavenderWeb.darken010
              }}
            >
              {"APY: " + formatExpectedApy(expectedApy)}
            </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ExpectedAPY;
