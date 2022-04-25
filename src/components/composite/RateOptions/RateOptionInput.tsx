import React, { useCallback, useState } from 'react';
import IconLabel from '../IconLabel/IconLabel';
import MaskedIntegerField from '../MaskedIntegerField/MaskedIntegerField';

export type RateOptionsProps = {
  defaultValue?: number;
  hint: string;
  label: string;
  onChange: (value: number, increment: boolean | null) => void;
  value?: number | undefined;
};

const RateOptionsInput: React.FunctionComponent<RateOptionsProps> = ({
  defaultValue,
  hint,
  label,
  onChange,
  value,
}) => {
  const defaultInputValue = () => {
    const defaultVal = (value ?? defaultValue)
    if (typeof defaultVal !== 'undefined') {
      return defaultVal.toString();
    }
  };
  const [inputValue, setInputValue] = useState<string | undefined>(defaultInputValue());

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      setInputValue(newValue);
      const oldParsedValue = parseFloat(inputValue || '1');
      const newParsedValue = parseFloat(newValue || '1');

      if(newParsedValue !== oldParsedValue) {
        onChange(newParsedValue, null);
      }
    },
    [onChange, setInputValue],
  );

  const handleBlur = useCallback(
    () => {
      // eslint-disable-next-line
      console.log('blur set', value);
      setInputValue(value?.toString());
    }, 
    [setInputValue, value]
  );

  return (
    <MaskedIntegerField
      allowDecimals
      allowNegativeValue={false}
      decimalsLimit={3}
      inputSize="small"
      suffix='%'
      label={<IconLabel label={label} icon="information-circle" info={hint} />}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default RateOptionsInput;