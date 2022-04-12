import React, { useCallback } from 'react';
import isUndefined from 'lodash/isUndefined';
import Box from '@mui/material/Box';

import DebouncedIntegerField, {
  DebouncedIntegerFieldDetails,
} from '../DebouncedIntegerField/DebouncedIntegerField';
import IconLabel from '../IconLabel/IconLabel';

export type RateOptionsProps = {
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  fixedLow?: number;
  fixedHigh?: number;
  onChangeFixedLow: (value: number, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number, increment: boolean | null) => void;
};

const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
  defaultFixedLow,
  defaultFixedHigh,
  fixedLow,
  fixedHigh,
  onChangeFixedLow,
  onChangeFixedHigh,
}) => {
  const fixedLowValue = isUndefined(fixedLow) ? defaultFixedLow : fixedLow;
  const fixedHighValue = isUndefined(fixedHigh) ? defaultFixedHigh : fixedHigh;

  const handleChangeFixedLow = useCallback(
    (newFixedLow: string | undefined, details?: DebouncedIntegerFieldDetails) => {
      onChangeFixedLow(parseFloat(newFixedLow || '1'), details?.increment || null);
    },
    [onChangeFixedLow],
  );
  const handleChangeFixedHigh = useCallback(
    (newFixedHigh: string | undefined, details?: DebouncedIntegerFieldDetails) => {
      onChangeFixedHigh(parseFloat(newFixedHigh || '1'), details?.increment || null);
    },
    [onChangeFixedHigh],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        '& > *:not(:last-child)': { marginRight: (theme) => theme.spacing(10) },
        flexDirection: 'row',
      }}
    >
      <DebouncedIntegerField
        size="small"
        label={<IconLabel label="fixed low" icon="information-circle" info="The lower rate of the fixed rate range within which to deposit liquidity" />}
        value={fixedLowValue}
        onChange={handleChangeFixedLow}
      />
      <DebouncedIntegerField
        size="small"
        label={<IconLabel label="fixed high" icon="information-circle" info="The upper rate of the fixed rate range within which to deposit liquidity" />}
        value={fixedHighValue}
        onChange={handleChangeFixedHigh}
      />
    </Box>
  );
};

export default RateOptions;
