import React, { useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useDebounce } from '@hooks';
import IntegerField, { IntegerFieldProps } from '../IntegerField/IntegerField';

export type DebouncedIntegerFieldProps = Omit<IntegerFieldProps, 'onChange'> & {
  onChange: (value: string | undefined) => void;
};

const DebouncedIntegerField: React.FunctionComponent<DebouncedIntegerFieldProps> = ({
  value,
  onChange,
  ...props
}) => {
  const stringValue = isUndefined(value) ? value : `${value as string}`;
  const [editableValue, setEditableValue] = useState<string | undefined>(stringValue);
  const debouncedValue: string | undefined = useDebounce(editableValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableValue(event.target.value);
  };

  useEffect(() => {
    if (debouncedValue !== stringValue) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setEditableValue(stringValue);
  }, [stringValue]);

  return <IntegerField {...props} value={editableValue} onChange={handleChange} type="number" />;
};

export default DebouncedIntegerField;
