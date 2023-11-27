import { AppLink, AppLinkProps } from 'brokoli-ui';
import React from 'react';
import { Link } from 'react-router-dom';

export const VoltzAppLink: React.FunctionComponent<AppLinkProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <AppLink {...rest} Component={Link}>
      {children}
    </AppLink>
  );
};
