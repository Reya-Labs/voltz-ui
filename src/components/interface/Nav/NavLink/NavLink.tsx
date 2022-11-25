import { Button } from '@components/atomic';
import React from 'react';
import {
  ACTIVE_CLASS,
  buttonGroupSx,
  buttonSx,
  OPEN_CLASS,
  popoverOverrideSx,
  subMenuButtonSx,
} from './style';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import CircleIcon from '@mui/icons-material/Circle';
import { colors } from '../../../../theme';
import { Link, useLocation } from 'react-router-dom';

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
        color: colors.wildStrawberry.base,
      }}
    />
  );

  return (
    <React.Fragment>
      <Button
        component={link ? Link : 'button'}
        to={link || ''}
        role="link"
        sx={buttonSx}
        variant="text"
        onClick={hasSubLinks ? handlePopoverOpen : undefined}
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
        startIcon={isNew ? newLinkIndicator : null}
      >
        {children}
      </Button>
      {hasSubLinks ? (
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorPopoverElement}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={popoverOverrideSx}
          elevation={0}
        >
          <ButtonGroup
            orientation="vertical"
            sx={buttonGroupSx}
            aria-label="vertical outlined button group"
          >
            {subLinks?.map((subLink) => (
              <Button
                component={Link}
                to={subLink.link}
                key={subLink.text}
                role="link"
                variant="text"
                sx={subMenuButtonSx}
                onClick={handlePopoverClose}
                startIcon={subLink.isNew ? newLinkIndicator : null}
                className={isActiveLink(subLink.link, [], pathname) ? ACTIVE_CLASS : undefined}
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
