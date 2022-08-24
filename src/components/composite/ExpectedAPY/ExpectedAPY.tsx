import React, { useEffect, useState } from 'react';

import { SelectInput, Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';
import Box from '@mui/material/Box';
import { colors } from '@theme';
import { formatNumber } from '@utilities';

interface ExpectedAPYProps {
  expectedAPY?: number[][];
}

export const ExpectedAPY = ({ expectedAPY }:ExpectedAPYProps) => {
  type ExpectedAPYOption = {label: string;  value: string};
  const [options, setOptions] = useState<ExpectedAPYOption[]>();
  const [selectedOptionValue, setSelectedOptionValue] = useState<string>();

  const handleChangeMoveBy = (value: string) => {
    setSelectedOptionValue(value);
  }

  useEffect(() => {
    if(expectedAPY) {
      const newOptions = expectedAPY[0].map((labelNum, index) => ({
        label: `${formatNumber(labelNum)}%`, 
        value: formatNumber(expectedAPY[1][index])
      }));
      setOptions(newOptions);
      setSelectedOptionValue(newOptions[2].value)
    }
  }, expectedAPY);

  if(!expectedAPY || !options) return null;

  return (
    <>
      <Box>
        <Box sx={{ 
          display: 'inline-block',
          padding: (theme) => theme.spacing(4), 
          borderRadius: '8px', 
          background: colors.lavenderWeb.darken045 
        }}>
          <Typography
            variant="h3"
            label={<IconLabel label="Expected APY" icon="information-circle" info="The APY you would get in a scenario in which the variable APY has the selected value until the pool's maturity" />}
            agentStyling
          >
            {selectedOptionValue ? `${selectedOptionValue}%` : '---'}
          </Typography>
        </Box>
        <Box sx={{
          display: 'inline-block',
          padding: (theme) => theme.spacing(4), 
          marginLeft: (theme) => theme.spacing(6)
        }}>
          <SelectInput 
            defaultValue={options[2].value}
            name="ExpectedVariableAPY"
            label={<IconLabel label="Expected Variable APY:" icon="information-circle" info="Select the percentage of the variable APY between now and the end of the pool that you would like to simulate." />} 
            onChange={(event) => handleChangeMoveBy(event.target.value as string)}
            options={options}
            size="small"
            sx={{ width: '90px' }}
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
