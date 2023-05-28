import React, { ReactNode } from 'react';

import { ActiveSubPageLink, SubPageLinkStyled } from './SubPageLink.styled';

export type SubLinkProps = {
  to: string;
  isActive: boolean;
  Icon: React.FunctionComponent;
  children?: ReactNode | undefined;
};

export const SubPageLink: React.FunctionComponent<SubLinkProps> = ({
  to,
  Icon,
  isActive,
  children,
}: SubLinkProps) => {
  const LinkUI = isActive ? ActiveSubPageLink : SubPageLinkStyled;
  return (
    <LinkUI data-testid={isActive ? 'ActiveSubLinkButton' : 'SubLinkButton'} role="link" to={to}>
      {Icon ? <Icon /> : null}
      {children}
    </LinkUI>
  );
};
