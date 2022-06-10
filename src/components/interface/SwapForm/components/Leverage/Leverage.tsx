import React, { useCallback, useState } from 'react';
import { Box, Slider } from '@mui/material';
import { IntegerField, IconLabel } from '@components/composite';

export type LeverageProps = {
  minRequiredMargin?: number; 
}

const Leverage = ({}: LeverageProps) => {
  const hint = 'todo';
  const [value, setValue] = useState(50);

  const handleChangeSlider = useCallback((event: Event, newValue: number | number[]) => {
    if(typeof newValue === 'number') {
      setValue(newValue);
    }
  }, [setValue]);

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.currentTarget.value);
    if(!isNaN(newValue)) {
      setValue(newValue);
    }
  }, [setValue])
  
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ flexGrow: '0', width: '80px' }}>
        <IntegerField
          size="small"
          label={<IconLabel label={'Leverage'} icon="information-circle" info={hint} />}
          value={value}
          onChange={handleChangeInput}
        />
      </Box>
      <Box sx={{ flexGrow: '1', marginLeft: (theme) => theme.spacing(4), display: 'flex', alignItems: 'center' }}>
        <Slider 
          min={0} 
          max={100} 
          value={value} 
          onChange={handleChangeSlider} 
          sx={{marginTop: '26px' }} 
        />
      </Box>
    </Box>
  )
}

export default Leverage;