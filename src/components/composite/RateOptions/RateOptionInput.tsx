import { toUSFormat } from '../../../utilities/number';
import React, { useCallback, useState } from 'react';
import { IconLabel } from '../IconLabel/IconLabel';
import { MaskedIntegerField } from '../MaskedIntegerField/MaskedIntegerField';

export type RateOptionsInputProps = {
  defaultValue?: number;
  disabled?: boolean;
  error?: string;
  hint: string;
  label: string;
  onChange: (value: number | undefined, increment: boolean | null) => void;
  value?: number | undefined;
};

const RateOptionsInput: React.FunctionComponent<RateOptionsInputProps> = ({
  defaultValue,
  disabled,
  error,
  hint,
  label,
  onChange,
  value,
}) => {
  const defaultInputValue = () => {
    const defaultVal = value ?? defaultValue;
    if (typeof defaultVal !== 'undefined') {
      return defaultVal.toString();
    }
  };

  const [inputValue, setInputValue] = useState<string | undefined>(defaultInputValue());

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      const usFormatted = toUSFormat(newValue);
      setInputValue(newValue);
      onChange(usFormatted ? parseFloat(usFormatted) : undefined, null);
    },
    [onChange, setInputValue],
  );

  const handleBlur = useCallback(() => {
    // eslint-disable-next-line
    setInputValue(value?.toString());
  }, [setInputValue, value]);

  return (
    <MaskedIntegerField
      allowDecimals
      allowNegativeValue={false}
      decimalsLimit={3}
      disabled={!!disabled}
      error={!!error}
      errorText={error}
      inputSize="small"
      suffix="%"
      suffixPadding={20}
      label={<IconLabel label={label} icon="information-circle" info={hint} />}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default RateOptionsInput;
