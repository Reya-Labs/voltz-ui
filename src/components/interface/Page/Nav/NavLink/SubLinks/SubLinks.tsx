import React from 'react';
import { useLocation } from 'react-router-dom';

import { isActiveLink } from '../helpers';
import { SubLink } from '../SubLink/SubLink';
import { SubLinksButtonGroup } from './SubLinks.styled';

export type SubLinksProps = {
  subLinks: {
    text: string;
    link: string;
    isNew?: boolean;
  }[];
  onClick: () => void;
};
export const SubLinks: React.FunctionComponent<SubLinksProps> = ({ subLinks, onClick }) => {
  const { pathname } = useLocation();
  return (
    <SubLinksButtonGroup
      aria-label="vertical outlined button group"
      data-testid="SubLinks-SubLinksButtonGroup"
      orientation="vertical"
    >
      {subLinks.map((subLink) => (
        <SubLink
          key={subLink.text}
          isActive={isActiveLink(subLink.link, [], pathname)}
          isNew={Boolean(subLink.isNew)}
          link={subLink.link}
          text={subLink.text}
          onClick={onClick}
        />
      ))}
    </SubLinksButtonGroup>
  );
};
