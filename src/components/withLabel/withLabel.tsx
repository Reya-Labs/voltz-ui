import React from 'react';
import FormControl from '@mui/material/FormControl';

import { InputLabel } from '../atomic';

const withLabel = <T,>(WrappedComponent: React.ComponentType<T>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  type ComponentWithLabelProps = T & { label?: React.ReactElement | string };

  const ComponentWithLabel = ({ label, ...props }: ComponentWithLabelProps) => {
    if (!label) {
      return <WrappedComponent {...(props as T)} />;
    }

    if (React.isValidElement(label)) {
      return (
        <FormControl>
          {label}
          <WrappedComponent {...(props as T)} />
        </FormControl>
      );
    }

    return (
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <WrappedComponent {...(props as T)} />
      </FormControl>
    );
  };

  ComponentWithLabel.displayName = `withLabel(${displayName})`;

  return ComponentWithLabel;
};

export default withLabel;
