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
  }[];
  children: string;
};

export const NavLink: React.FunctionComponent<NavLinkProps> = ({
  subLinks = [],
  children,
  link,
  isNew,
}) => {
  const { pathname } = useLocation();
  const hasSubLinks = subLinks && subLinks.length !== 0;
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
    subLinks?.map((l) => l.link),
    pathname,
  );

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
          <SubLinks subLinks={subLinks || []} onClick={handlePopoverClose} />
        </NavLinkPopover>
      ) : null}
    </React.Fragment>
  );
};
