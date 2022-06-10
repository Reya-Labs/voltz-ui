import React, { useCallback, useRef, useState } from 'react';
import { Box, Slider } from '@mui/material';
import { IntegerField, IconLabel } from '@components/composite';

export type LeverageProps = {
  minRequiredMargin?: number; 
  onChange: (value: number) => void;
  value: number;
}

const Leverage = ({onChange, value}: LeverageProps) => {
  const delay = 200;
  const hint = 'todo';
  const [internalValue, setInternvalValue] = useState(value);
  const timer = useRef<number>();

  const handleChangeSlider = useCallback((event: Event, newValue: number | number[]) => {
    if(typeof newValue === 'number') {
      setInternvalValue(newValue);
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChange(newValue), delay);
    }
  }, [onChange, setInternvalValue]);

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.currentTarget.value);
    if(!isNaN(newValue)) {
      setInternvalValue(newValue);
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChange(newValue), delay);
    }
  }, [onChange, setInternvalValue])
  
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ flexGrow: '0', width: '80px' }}>
        <IntegerField
          size="small"
          label={<IconLabel label={'Leverage'} icon="information-circle" info={hint} />}
          value={internalValue}
          onChange={handleChangeInput}
        />
      </Box>
      <Box sx={{ flexGrow: '1', marginLeft: (theme) => theme.spacing(4), display: 'flex', alignItems: 'center' }}>
        <Slider 
          min={0} 
          max={100} 
          step={0.01}
          value={internalValue} 
          onChange={handleChangeSlider}
          marks={[
            {
              value: 0,
              label: '0x'
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