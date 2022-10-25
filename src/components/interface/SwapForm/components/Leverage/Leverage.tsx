import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { MaskedIntegerField, IconLabel } from '@components/composite';
import { isNumber, isUndefined } from 'lodash';
import { formatNumber, notFormatted, stringToBigFloat, toUSFormat } from '@utilities';
import { Button } from '@mui/material';
import { activeButtonStyle, buttonStyle } from './style';

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

const Leverage = ({
  availableNotional,
  minMargin,
  notional,
  onChange,
  value,
  resetDeltaState,
}: LeverageProps) => {
  const delay = 1000;
  const hint = 'Choose the amount of leverage you wish to trade with from the options on the right or set your own leverage by typing it in the box below.';
  const margin = isNumber(minMargin) ? Math.max(minMargin, 0.0001) : undefined;

  const [internalValue, setInternalValue] = useState<number | undefined>(value);
  const [inputValue, setInputValue] = useState(formatNumber(value, 0, 2));
  const isDisabledLeverageBox =
    isUndefined(availableNotional) || isUndefined(margin) || isUndefined(notional);
  const isDisabled =
    isUndefined(availableNotional) ||
    isUndefined(margin) ||
    isUndefined(notional) ||
    isUndefined(internalValue);
  const timer = useRef<number>();

  const [activeOption, setActiveOption] = useState(LEVERAGE_OPTIONS[0]);

  useEffect(() => {
    setInternalValue(value);
    const formatted = formatNumber(value, 0, 2);
    setInputValue(formatted);
  }, [value, resetDeltaState]);

  const handleChangeInput = (inputVal: string | undefined) => {
    if (inputVal) {
      const usFormatted = toUSFormat(inputVal);
      const newValue = usFormatted ? stringToBigFloat(usFormatted) : NaN;
      if (!isNaN(newValue)) {
        setInternalValue(newValue);
        setInputValue(inputVal);
        window.clearInterval(timer.current);
        timer.current = window.setTimeout(() => onChange(newValue), delay);
      }
    } else {
      setInternalValue(undefined);
      setInputValue('');
      window.clearInterval(timer.current);
      timer.current = window.setTimeout(() => onChange(0, true), delay * 2);
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ flexGrow: '0', width: '80px' }}>
        <MaskedIntegerField
          allowDecimals
          disabled={isDisabledLeverageBox}
          dynamic
          inputSize="small"
          label={<IconLabel label={'Leverage'} icon="information-circle" info={hint} />}
          onChange={handleChangeInput}
          suffix="x"
          suffixPadding={0}
          value={notFormatted(inputValue)}
        />
      </Box>
      <Box
        sx={{
          flexGrow: '1',
          marginLeft: (theme) => theme.spacing(8),
          marginTop: (theme) => theme.spacing(5.5),
          display: 'flex',
          alignItems: 'center',
          columnGap: (theme) => theme.spacing(2),
          width: "232px"
        }}
      >
        {LEVERAGE_OPTIONS.map(opt => {
          return (
            <Button
              key={opt}
              variant={"contained"}
              size ="small"
              color="secondary"
              sx={opt === activeOption ? activeButtonStyle : buttonStyle}
              onClick={() => { onChange(opt); setActiveOption(opt) }}
            >
              { `${opt}x` }
            </Button>
          )
        }) 
          } 
      
        <Box/>
      </Box>
    </Box>
  );
};

export default Leverage;
