import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import isNumber from 'lodash.isnumber';
import isUndefined from 'lodash.isundefined';
import { useEffect, useRef, useState } from 'react';

import {
  formatLeverage,
  formatNumber,
  removeFormat,
  stringToBigFloat,
} from '../../../../utilities/number';
import { IconLabel } from '../../../composite/IconLabel/IconLabel';
import { MaskedIntegerField } from '../../../composite/MaskedIntegerField/MaskedIntegerField';
import { activeButtonStyle, buttonStyle, leverageBoxStyle } from './style';

/**
 * margin: for a new position this is just the ratio between notional and minimum margin required
 * for returning positions we need to base the calculation on the notional and margin amounts post swap
 */

export type LeverageProps = {
  availableNotional?: number;
  minMargin?: number;
  fee?: number;
  notional?: number;
  onChange: (value: number, resetToDefaultLeverage?: boolean) => void;
  value: number;
  resetDeltaState: boolean;
};

// Set the leverage options in this array
const DEFAULT_LEVERAGE_OPTIONS = [100, 500, 1000];

export const Leverage = ({
  availableNotional,
  minMargin,
  fee,
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

  const maxLeverage =
    isUndefined(availableNotional) ||
    isUndefined(minMargin) ||
    isUndefined(notional) ||
    isUndefined(fee)
      ? 0
      : parseFloat((Math.min(notional, availableNotional) / (minMargin - fee)).toFixed(2));
  const LEVERAGE_OPTIONS =
    isUndefined(availableNotional) ||
    isUndefined(minMargin) ||
    isUndefined(notional) ||
    isUndefined(fee) ||
    maxLeverage <= 0
      ? DEFAULT_LEVERAGE_OPTIONS
      : [
          formatLeverage(maxLeverage / 4),
          formatLeverage(maxLeverage / 2),
          formatLeverage(maxLeverage),
        ];

  const [activeOption, setActiveOption] = useState(value);

  useEffect(() => {
    const formatted = formatNumber(value, 0, 2);
    setInputValue(formatted);
    setActiveOption(parseFloat(formatted));
  }, [value, resetDeltaState]);

  const handleChangeInput = (inputVal: string | undefined) => {
    if (inputVal) {
      const newValue = stringToBigFloat(inputVal);
      if (!isNaN(newValue)) {
        setInputValue(inputVal);
        window.clearInterval(timer.current);
        timer.current = window.setTimeout(() => {
          onChange(newValue);
          setActiveOption(newValue);
        }, delay);
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
          value={removeFormat(inputValue)}
          allowDecimals
          dynamic
          onChange={handleChangeInput}
        />
      </Box>
      <Box sx={leverageBoxStyle}>
        {LEVERAGE_OPTIONS.map((opt, index) => (
          <Button
            key={`${opt}_${index}`}
            color="secondary"
            size="small"
            sx={opt === activeOption ? activeButtonStyle : buttonStyle}
            variant={'contained'}
            onClick={() => {
              onChange(opt);
              handleChangeInput(opt.toString());
              setActiveOption(opt);
            }}
          >
            {`${opt}x`}
          </Button>
        ))}
        <Box />
      </Box>
    </Box>
  );
};