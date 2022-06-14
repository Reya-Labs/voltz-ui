import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Slider } from '@mui/material';
import { MaskedIntegerField, IconLabel } from '@components/composite';
import { colors } from '@theme';

export type LeverageProps = {
  minRequiredMargin?: number; 
  onChange: (value: number) => void;
  value: number;
}

const Leverage = ({onChange, value}: LeverageProps) => {
  const delay = 50;
  const hint = 'todo';
  const [internalValue, setInternalValue] = useState(value);
  const timer = useRef<number>();

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
          inputSize="small"
          label={<IconLabel label={'Leverage'} icon="information-circle" info={hint} />}
          value={internalValue}
          onChange={handleChangeInput}
          suffix='X'
        />
      </Box>
      <Box sx={{ flexGrow: '1', marginLeft: (theme) => theme.spacing(4), display: 'flex', alignItems: 'center' }}>
        <Slider 
          min={1} 
          max={100} 
          step={0.01}
          value={internalValue} 
          onChange={handleChangeSlider}
          marks={[
            {
              value: 1,
              label: '1x'
            },
            {
              value: 50,
              label: '50x',
            },
            {
              value: 100,
              label: '100x',
            }
          ]} 
          sx={{
            marginTop: '26px',
            '& .MuiSlider-track': {
              background: 'linear-gradient(90deg, #00D395 69.9%, #F1D302 89.75%, #F61067 100.33%)',
              width: '50% !important',
              left: '50% !important'
            },
            '& .MuiSlider-mark[data-index="1"]': {
              height: '6px',
              width: '3px',
              background: colors.vzCustomGreen2,
            },
            '& .MuiSlider-mark[data-index="2"]': {
              height: '6px',
              width: '3px',
              background: colors.vzCustomRed2,
            }
          }} 
        />
      </Box>
    </Box>
  )
}

export default Leverage;