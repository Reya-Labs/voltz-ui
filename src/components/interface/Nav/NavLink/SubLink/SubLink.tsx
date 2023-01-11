import React from 'react';
import { Link } from 'react-router-dom';

import { NewLinkIndicator } from '../NewLinkIndicator/NewLinkIndicator';
import { ActiveSubLinkButton, SubLinkButton } from './SubLink.styled';

export type SubLinkProps = {
  link: string;
  isNew: boolean;
  onClick: () => void;
  text: string;
  isActive: boolean;
};

export const SubLink: React.FunctionComponent<SubLinkProps> = ({
  link,
  text,
  isNew,
  onClick,
  isActive,
}: SubLinkProps) => {
  const SubLinkUI = isActive ? ActiveSubLinkButton : SubLinkButton;
  return (
    <SubLinkUI
      component={Link}
      data-testid={isActive ? 'ActiveSubLinkButton' : 'SubLinkButton'}
      role="link"
      startIcon={isNew ? <NewLinkIndicator /> : null}
      to={link}
      variant="text"
      onClick={onClick}
    >
      {text}
    </SubLinkUI>
  );
};
