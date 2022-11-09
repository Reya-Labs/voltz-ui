import CircleIcon from '@mui/icons-material/Circle';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { colors } from '../../../../theme';
import { Button } from '../../../atomic/Button/Button';
import {
  ACTIVE_CLASS,
  buttonGroupSx,
  buttonSx,
  OPEN_CLASS,
  popoverOverrideSx,
  subMenuButtonSx,
} from './style';

type NavLinkProps = {
  link?: string;
  isNew?: boolean;
  subLinks?: {
    text: string;
    link: string;
    isNew?: boolean;
  }[];
};

function isActiveLink(link: string = '', subLinks: string[] = [], pathName: string): boolean {
  return (
    (link && pathName.indexOf(link) !== -1) || subLinks?.some((l) => isActiveLink(l, [], pathName))
  );
}

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
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorPopoverElement(event.currentTarget);
  const handlePopoverClose = () => setAnchorPopoverElement(null);

  const isPopoverOpen = Boolean(anchorPopoverElement);
  const newLinkIndicator = (
    <CircleIcon
      sx={{
        width: (theme) => theme.spacing(1),
        height: (theme) => theme.spacing(1),
        borderRadius: '50%',
        color: colors.wildStrawberry,
      }}
    />
  );

  return (
    <React.Fragment>
      <Button
        className={
          isPopoverOpen
            ? OPEN_CLASS
            : isActiveLink(
                link,
                subLinks?.map((l) => l.link),
                pathname,
              )
            ? ACTIVE_CLASS
            : undefined
        }
        component={link ? Link : 'button'}
        role="link"
        startIcon={isNew ? newLinkIndicator : null}
        sx={buttonSx}
        to={link || ''}
        variant="text"
        onClick={hasSubLinks ? handlePopoverOpen : undefined}
      >
        {children}
      </Button>
      {hasSubLinks ? (
        <Popover
          anchorEl={anchorPopoverElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          elevation={0}
          open={isPopoverOpen}
          sx={popoverOverrideSx}
          onClose={handlePopoverClose}
        >
          <ButtonGroup
            aria-label="vertical outlined button group"
            orientation="vertical"
            sx={buttonGroupSx}
          >
            {subLinks?.map((subLink) => (
              <Button
                key={subLink.text}
                className={isActiveLink(subLink.link, [], pathname) ? ACTIVE_CLASS : undefined}
                component={Link}
                role="link"
                startIcon={subLink.isNew ? newLinkIndicator : null}
                sx={subMenuButtonSx}
                to={subLink.link}
                variant="text"
                onClick={handlePopoverClose}
              >
                {subLink.text}
              </Button>
            ))}
          </ButtonGroup>
        </Popover>
      ) : null}
    </React.Fragment>
  );
};
