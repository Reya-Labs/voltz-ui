import React from 'react';

import { SelectInput, Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';
import { formatNumber } from '@utilities';
import { isUndefined } from 'lodash';
import Box from '@mui/material/Box';
import { colors } from '@theme';

interface ExpectedAPYProps {
  expectedAPY?: number;
  onChangeMovesRatesBy: (value: number) => void;
  ratesMoveBy: number;
}

export const ExpectedAPY = ({ expectedAPY, onChangeMovesRatesBy, ratesMoveBy }:ExpectedAPYProps) => {
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
            label={<IconLabel label="Expected APY" icon="information-circle" info="Expected APY" />}
            agentStyling
          >
            {!isUndefined(expectedAPY) ? formatNumber(expectedAPY) : '---'}
          </Typography>
        </Box>
        <Box sx={{
          display: 'inline-block',
          padding: (theme) => theme.spacing(4), 
          marginLeft: (theme) => theme.spacing(6)
        }}>
          <SelectInput 
            name="ratesMoveBy"
            label={<IconLabel label="Rates move by:" icon="information-circle" info="Rates move by" />} 
            onChange={(event) => onChangeMovesRatesBy(event.target.value as number)}
            options={[
              { label: '-1%', value: -1 },
              { label: '1%',  value: 1  },
              { label: '5%',  value: 5  },
              { label: '10%', value: 10 },
            ]}
            value={ratesMoveBy}
            size="small"
            sx={{ width: '80px' }}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: (theme) => theme.spacing(4) }}>
        <Typography variant='body1' sx={{ color: colors.lavenderWeb.darken020, fontSize: '14px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere.
        </Typography>
      </Box>
    </>
  );
};

export default ExpectedAPY;
