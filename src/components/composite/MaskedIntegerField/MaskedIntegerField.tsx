import React, { useEffect } from 'react';
import { useIMask } from 'react-imask';

import { Input, InputProps } from '../../atomic';

export type MaskedIntegerFieldProps = Omit<InputProps, 'onChange'> & {
  affix: string;
  onChange?: (value: string) => void;
};

const MaskedIntegerField: React.FunctionComponent<MaskedIntegerFieldProps> = ({
  affix,
  onChange,
  ...props
}) => {
  const { ref, unmaskedValue } = useIMask({
    mask: `nn ${affix}`,
    lazy: false, // make placeholder always visible
    blocks: {
      nn: {
        mask: Number,
        scale: 2,
        signed: false,
        thousandsSeparator: ',',
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ',',
        mapToRadix: ['.'],
      },
    },
  });

  useEffect(() => {
    if (onChange) {
      onChange(unmaskedValue);
    }
  }, [unmaskedValue, onChange]);

  return <Input {...props} inputRef={ref} />;
};

export default MaskedIntegerField;
