import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { isActiveLink } from './helpers';
import { NavLinkButton, NavLinkPopover } from './NavLink.styled';
import { NewLinkIndicator } from './NewLinkIndicator/NewLinkIndicator';
import { SubLinks } from './SubLinks/SubLinks';

type NavLinkProps = {
  link?: string;
  isNew?: boolean;
  subLinks?: {
    text: string;
    link: string;
    isNew?: boolean;
    hidden: boolean;
  }[];
  children: string;
  hidden: boolean;
};

export const NavLink: React.FunctionComponent<NavLinkProps> = ({
  subLinks = [],
  children,
  link,
  isNew,
  hidden,
}) => {
  const { pathname } = useLocation();
  const subLinksNotHidden = (subLinks || []).filter((sL) => !sL.hidden);
  const hasSubLinks = subLinksNotHidden.length !== 0;
  const [anchorPopoverElement, setAnchorPopoverElement] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPopoverElement(event.currentTarget);
  };
  const handlePopoverClose = () => setAnchorPopoverElement(null);

  const isPopoverOpen = Boolean(anchorPopoverElement);
  const isActive = isActiveLink(
    link,
    subLinksNotHidden?.map((l) => l.link),
    pathname,
  );

  if (hidden) {
    return null;
  }

  return (
    <React.Fragment>
      <NavLinkButton
        component={link ? Link : 'button'}
        data-testid={
          isPopoverOpen ? 'OpenNavLinkButton' : isActive ? 'ActiveNavLinkButton' : 'NavLinkButton'
        }
        isActive={isActive}
        isPopoverOpen={isPopoverOpen}
        role="link"
        startIcon={isNew ? <NewLinkIndicator /> : null}
        to={link || ''}
        variant="text"
        onClick={hasSubLinks ? handlePopoverOpen : undefined}
      >
        {children}
      </NavLinkButton>
      {hasSubLinks ? (
        <NavLinkPopover
          anchorEl={anchorPopoverElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          data-testid="NavLinkPopover"
          elevation={0}
          open={isPopoverOpen}
          onClose={handlePopoverClose}
        >
          <SubLinks subLinks={subLinksNotHidden || []} onClick={handlePopoverClose} />
        </NavLinkPopover>
      ) : null}
    </React.Fragment>
  );
};
