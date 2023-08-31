import React, { ReactNode } from 'react';

import { ActiveSubmenuLink, SubmenuLinkStyled } from './SubmenuLink.styled';

export type SubmenuLinkProps = {
  to: string;
  isActive: boolean;
  disabled: boolean;
  Icon: React.FunctionComponent;
  children?: ReactNode | undefined;
};

export const SubmenuLink: React.FunctionComponent<SubmenuLinkProps> = ({
  to,
  Icon,
  isActive,
  children,
  disabled,
}: SubmenuLinkProps) => {
  const LinkUI = isActive ? ActiveSubmenuLink : SubmenuLinkStyled;
  return (
    <LinkUI
      data-testid={isActive ? 'ActiveSubLinkButton' : 'SubLinkButton'}
      disabled={disabled}
      role="link"
      to={to}
    >
      {Icon ? <Icon /> : null}
      {children}
    </LinkUI>
  );
};
