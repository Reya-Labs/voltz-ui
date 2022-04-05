import React, { useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useDebounce } from '@hooks';
import IntegerField, { IntegerFieldProps } from '../IntegerField/IntegerField';

export type DebouncedIntegerFieldDetails = {
  increment: boolean | null;
};

export type DebouncedIntegerFieldProps = Omit<IntegerFieldProps, 'onChange'> & {
  onChange: (value: string | undefined, details?: DebouncedIntegerFieldDetails) => void;
};

const DebouncedIntegerField: React.FunctionComponent<DebouncedIntegerFieldProps> = ({
  value,
  onChange,
  ...props
}) => {
  const stringValue = isUndefined(value) ? value : `${value as string}`;
  const [details, setDetails] = useState<DebouncedIntegerFieldDetails | undefined>();
  const [editableValue, setEditableValue] = useState<string | undefined>(stringValue);
  const debouncedValue: string | undefined = useDebounce(editableValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const getIncrement = () => {
      if ((event.nativeEvent as InputEvent).inputType === 'insertText') {
        return null;
      }

      return parseInt(event.target.value) > parseInt(stringValue || '0');
    };

    setEditableValue(event.target.value);
    setDetails({ increment: getIncrement() });
  };

  useEffect(() => {
    if (debouncedValue !== stringValue) {
      onChange(debouncedValue, details);
    }
  }, [debouncedValue, details]);

  useEffect(() => {
    // todo: small bug where editableValue will not be updated if stringValue does not change
    // e.g. 6.1 -> 6.69 followed by 6.5 -> 6.69, input will stay at 6.5

    setEditableValue(stringValue);
  }, [stringValue]);

  return <IntegerField {...props} value={editableValue} onChange={handleChange} type="number" />;
};

export default DebouncedIntegerField;
