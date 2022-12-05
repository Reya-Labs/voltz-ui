import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';

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
      if (typeof label === 'string') {
        return label.toUpperCase();
      }

      return label;
    };

    if (!label) {
      return <WrappedComponent {...(props as T)} />;
    }

    return (
      <FormControl sx={{ width: '100%' }}>
        <InputLabel
          error={error}
          htmlFor={id}
          sx={{
            position: 'relative',
            transform: 'none',
            marginTop: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(2),
            overflow: 'visible',
          }}
          shrink
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
