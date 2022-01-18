import React from 'react';

const withLabel = <T,>(
  WrappedComponent: React.ComponentType<T>,
  label: React.ReactElement | string,
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLabel = (props: T) => {
    return (
      <>
        {label}
        <WrappedComponent {...(props as T)} />
      </>
    );
  };

  ComponentWithLabel.displayName = `withLabel(${displayName})`;

  return ComponentWithLabel;
};

export default withLabel;
