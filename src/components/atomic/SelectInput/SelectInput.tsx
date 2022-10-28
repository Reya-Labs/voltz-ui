import React from 'react';
import { withLabel } from '../../hoc';
import { inputStyles } from '@theme';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { OverrideTypes } from '@utilities';

export type SelectInputProps = OverrideTypes<
  SelectProps,
  {
    background?: 'standard' | 'dark';
    options: { label: string; value: string | number }[];
  }
>;

export const SelectInputBase = ({
  background = 'standard',
  options,
  ...props
}: SelectInputProps) => {
  const styles = inputStyles({
    background: 'dark',
    disabled: props.disabled,
    dynamic: false,
    error: props.error,
    inputSize: props.size,
    suffixPadding: 0,
    subtext: false,
  });

  return (
    <Select {...props} sx={{ ...styles, ...(props.sx || {}) }}>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export const SelectInput = withLabel<SelectInputProps>(SelectInputBase);
export default SelectInput;
