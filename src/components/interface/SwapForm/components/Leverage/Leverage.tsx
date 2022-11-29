import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import isNumber from 'lodash/isNumber';
import isUndefined from 'lodash/isUndefined';
import { useEffect, useRef, useState } from 'react';

import {
  formatNumber,
  notFormatted,
  stringToBigFloat,
  toUSFormat,
} from '../../../../../utilities/number';
import { IconLabel } from '../../../../composite/IconLabel/IconLabel';
import { MaskedIntegerField } from '../../../../composite/MaskedIntegerField/MaskedIntegerField';
import { activeButtonStyle, buttonStyle, leverageBoxStyle } from './style';

/**
 * margin: for a new position this is just the ratio between notional and minimum margin required
 * for returning positions we need to base the calculation on the notional and margin amounts post swap
 */

export type LeverageProps = {
  availableNotional?: number;
  minMargin?: number;
  notional?: number;
  onChange: (value: number, resetToDefaultLeverage?: boolean) => void;
  value: number;
  resetDeltaState: boolean;
};

// Set the leverage options in this array
const LEVERAGE_OPTIONS = [100, 500, 1000];

export const Leverage = ({
  availableNotional,
  minMargin,
  notional,
  onChange,
  value,
  resetDeltaState,
}: LeverageProps) => {
  const delay = 1000;
  const hint =
    'Choose the amount of leverage you wish to trade with from the options on the right or set your own leverage by typing it in the box below.';
  const margin = isNumber(minMargin) ? Math.max(minMargin, 0.0001) : undefined;

  const [inputValue, setInputValue] = useState(formatNumber(value, 0, 2));
  const isDisabledLeverageBox =
    isUndefined(availableNotional) || isUndefined(margin) || isUndefined(notional);

  const timer = useRef<number>();

  const [activeOption, setActiveOption] = useState(LEVERAGE_OPTIONS[0]);

  useEffect(() => {
    const formatted = formatNumber(value, 0, 2);
    setInputValue(formatted);
  }, [value, resetDeltaState]);

  const handleChangeInput = (inputVal: string | undefined) => {
    if (inputVal) {
      const usFormatted = toUSFormat(inputVal);
      const newValue = usFormatted ? stringToBigFloat(usFormatted) : NaN;
      if (!isNaN(newValue)) {
        setInputValue(inputVal);
        window.clearInterval(timer.current);
        timer.current = window.setTimeout(() => onChange(newValue), delay);
      }
    } else {
      setInputValue('');
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChange(0, true), delay * 2);
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ flexGrow: '0', width: '80px' }}>
        <MaskedIntegerField
          disabled={isDisabledLeverageBox}
          inputSize="small"
          label={<IconLabel icon="information-circle" info={hint} label={'Leverage'} />}
          suffix="x"
          suffixPadding={0}
          value={notFormatted(inputValue)}
          allowDecimals
          dynamic
          onChange={handleChangeInput}
        />
      </Box>
      <Box sx={leverageBoxStyle}>
        {LEVERAGE_OPTIONS.map((opt) => {
          return (
            <Button
              key={opt}
              color="secondary"
              size="small"
              sx={opt === activeOption ? activeButtonStyle : buttonStyle}
              variant={'contained'}
              onClick={() => {
                onChange(opt);
                setActiveOption(opt);
              }}
            >
              {`${opt}x`}
            </Button>
          );
        })}

        <Box />
      </Box>
    </Box>
  );
};
