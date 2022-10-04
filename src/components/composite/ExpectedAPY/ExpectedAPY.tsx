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
  userSimulatedVariableApy?: number;
  onChangeUserSimulatedVariableApy: (value: number, resetToDefault?: boolean) => void;
}

export const ExpectedAPY = ({ expectedApy, userSimulatedVariableApy, onChangeUserSimulatedVariableApy }:ExpectedAPYProps) => {
  const delay = 1000;

  const [userInput, setUserInput] = useState(!isUndefined(userSimulatedVariableApy) ? formatNumber(userSimulatedVariableApy, 0,2) : undefined);
  const timer = useRef<number>();

  useEffect(() => {
    const formatted = !isUndefined(userSimulatedVariableApy) ? formatNumber(userSimulatedVariableApy, 0,2) : undefined
    setUserInput(formatted);
  }, [userSimulatedVariableApy])

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

  return (
    <>
      <Box>
        <Box sx={{ 
          display: 'inline-block',
          padding: (theme) => theme.spacing(4), 
          borderRadius: '8px', 
          background: colors.lavenderWeb.darken045,
          maxWidth: '100px',
          width: '100px'
        }}>
          <Typography
            variant="h3"
            label={<IconLabel label="Expected APY" icon="information-circle" info="The APY you would get in a scenario in which the variable APY has the selected value until the pool's maturity" />}
            agentStyling
          >
            {formatExpectedApy(expectedApy)}
          </Typography>
        </Box>
        <Box sx={{
          display: 'inline-block',
          padding: (theme) => theme.spacing(4), 
          marginLeft: (theme) => theme.spacing(6),
          flexGrow: '0', width: '80px'
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
      </Box>
      <Box sx={{ marginTop: (theme) => theme.spacing(4) }}>
        <Typography variant='body1' sx={{ color: colors.lavenderWeb.darken020, fontSize: '14px' }}>
          Generate an expected APY for a given variable APY between now and the end of the pool. The expected APY factors in pool conditions and the details of your position.
        </Typography>
      </Box>
    </>
  );
};

export default ExpectedAPY;
