import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Slider } from '@mui/material';
import { MaskedIntegerField, IconLabel } from '@components/composite';
import { colors } from '@theme';
import { isNumber, isUndefined } from 'lodash';
import { formatNumber } from '@utilities';

/**
 * margin: for a new position this is just the ratio between notional and minimum margin required
 * for returning positions we need to base the calculation on the notional and margin amounts post swap
 */

export type LeverageProps = { 
  minMargin?: number;
  notional?: number; 
  onChange: (value: number) => void;
  value: number;
}

const Leverage = ({minMargin, notional, onChange, value}: LeverageProps) => {
  const delay = 50;
  const hint = 'todo';
  const margin = isNumber(minMargin) ? Math.max(minMargin, 0.1) : undefined;

  const isDisabled = isUndefined(margin) || isUndefined(notional);
  const [internalValue, setInternalValue] = useState(value);
  const timer = useRef<number>();

  const high = !isDisabled ? Math.min(Math.max((notional / margin), 1), 100) : 20;
  const low = 1;
  const range = high - low;

  const rainbow1 = !isDisabled ? Math.max((high / 2), 1) : 10;
  const rainbow2 = !isDisabled ? Math.max((high / 1.5), 1) : 14;
  const rainbow3 = !isDisabled ? Math.max((high / 1.2), 1) : 17;
  const rainbow4 = !isDisabled ? Math.max((high / 1.05), 1) : 19;

  const rainbow2Percent  = (rainbow2 / high) * 100;
  const rainbow3Percent  = (rainbow3 / high) * 100;
  const rainbow4Percent  = (rainbow4 / high) * 100;

  const rainbowStart = Math.max((1 - (rainbow1 / range)) * 100, 0);
  const rainbowWidth = 100 - rainbowStart;

  useEffect(() => {
    setInternalValue(value);
  }, [value])

  const handleChangeSlider = useCallback((event: Event, newValue: number | number[]) => {
    if(typeof newValue === 'number') {
      setInternalValue(newValue);
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChange(newValue), delay);
    }
  }, [onChange, setInternalValue]);

  const handleChangeInput = useCallback((inputVal: string) => {
    const newValue = parseFloat(inputVal);
    if(!isNaN(newValue)) {
      setInternalValue(newValue);
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChange(newValue), delay);
    }
  }, [onChange, setInternalValue])
  
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ flexGrow: '0', width: '80px' }}>
        <MaskedIntegerField
          allowDecimals
          disabled={isDisabled}
          dynamic
          inputSize="small"
          label={<IconLabel label={'Leverage'} icon="information-circle" info={hint} />}
          value={internalValue}
          onChange={handleChangeInput}
          suffix='X'
        />
      </Box>
      <Box sx={{ flexGrow: '1', marginLeft: (theme) => theme.spacing(4), display: 'flex', alignItems: 'center' }}>
        <Slider 
          disabled={isDisabled}
          min={low} 
          max={high} 
          step={0.01}
          value={internalValue} 
          onChange={handleChangeSlider}
          marks={[
            {
              value: low,
              label: `${formatNumber(low)}x`,
            },
            {
              value: rainbow1,
              label: `${formatNumber(rainbow1)}x`,
            },
            {
              value: high,
              label: `${formatNumber(high)}x`,
            }
          ]}
          sx={{
            marginTop: '16px',
            '& .MuiSlider-track': {
              background: `linear-gradient(90deg, #00D395 ${rainbow2Percent}%, #F1D302 ${rainbow3Percent}%, #F61067 ${rainbow4Percent}%)`,
              width: `${rainbowWidth}% !important`,
              left: `${rainbowStart}% !important`,
              display: isDisabled ? 'none' : undefined
            },
            '& .MuiSlider-thumb': {
              display: isDisabled ? 'none' : undefined
            },
            '& .MuiSlider-mark[data-index="1"]': {
              height: '6px',
              width: '3px',
              background: isDisabled ? undefined : colors.vzCustomGreen2,
            },
            '& .MuiSlider-mark[data-index="2"]': {
              height: '6px',
              width: '3px',
              background: isDisabled ? undefined : colors.vzCustomRed2,
            }
          }} 
        />
      </Box>
    </Box>
  )
}

export default Leverage;