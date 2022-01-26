import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import isEmpty from 'lodash/isEmpty';
import upperCase from 'lodash/upperCase';

import { useUniqueId } from '@hooks';

export type WithLabelProps = {
  label?: string;
  error?: boolean;
};

const withLabel = <T,>(WrappedComponent: React.FunctionComponent<T>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLabel: React.FunctionComponent<T & WithLabelProps> = ({
    label,
    error,
    ...props
  }) => {
    const id = useUniqueId();
    const upperCaseLabel = upperCase(label);

    return (
      <FormControl sx={{ width: '100%' }}>
        {!isEmpty(label) && (
          <InputLabel
            shrink
            htmlFor={id}
            error={error}
            sx={{
              position: 'relative',
              transform: 'none',
              marginBottom: (theme) => theme.spacing(1),
            }}
          >
            {upperCaseLabel}
          </InputLabel>
        )}
        <Box sx={{ width: '100%' }}>
          <WrappedComponent {...(props as T)} id={id} />
        </Box>
      </FormControl>
    );
  };

  ComponentWithLabel.displayName = `withLabel(${displayName})`;

  return ComponentWithLabel;
};

export default withLabel;
