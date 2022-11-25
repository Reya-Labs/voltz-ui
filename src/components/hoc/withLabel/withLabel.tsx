import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import isEmpty from 'lodash/isEmpty';
import upperCase from 'lodash/upperCase';
import isString from 'lodash/isString';

import { useUniqueId } from '../../../hooks';

export type WithLabelProps = {
  label?: React.ReactNode;
  error?: boolean;
};

// wrapper that gives the label and optionally does the tooltip
export const withLabel = <T,>(WrappedComponent: React.FunctionComponent<T>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLabel: React.FunctionComponent<T & WithLabelProps> = ({
    label,
    error,
    ...props
  }) => {
    const id = useUniqueId();
    const renderLabel = () => {
      if (isString(label)) {
        return upperCase(label);
      }

      return label;
    };

    if (isEmpty(label)) {
      return <WrappedComponent {...(props as T)} />;
    }

    return (
      <FormControl sx={{ width: '100%' }}>
        <InputLabel
          shrink
          htmlFor={id}
          error={error}
          sx={{
            position: 'relative',
            transform: 'none',
            marginTop: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(2),
            overflow: 'visible',
          }}
        >
          {renderLabel()}
        </InputLabel>
        <Box sx={{ width: '100%' }}>
          <WrappedComponent {...(props as T)} id={id} />
        </Box>
      </FormControl>
    );
  };

  ComponentWithLabel.displayName = `withLabel(${displayName})`;

  return ComponentWithLabel;
};
