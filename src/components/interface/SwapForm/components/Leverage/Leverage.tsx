import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Slider } from '@mui/material';
import { MaskedIntegerField, IconLabel } from '@components/composite';

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
          sx={{marginTop: '26px' }} 
        />
      </Box>
    </Box>
  )
}

export default Leverage;