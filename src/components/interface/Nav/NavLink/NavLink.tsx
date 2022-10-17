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
import { NewLinkIndicator } from './NewLinkIndicator';
import CircleIcon from '@mui/icons-material/Circle';
import { colors } from '@theme';

type NavLinkProps = {
  link?: string;
  isNew?: boolean;
  subLinks?: {
    text: string;
    link: string;
    isNew?: boolean;
  }[];
};

function isActiveLink(link: string = '', subLinks: string[] = []): boolean {
  const windowPath = window.location.href;
  return (link && windowPath.indexOf(link) !== -1) || subLinks?.some((l) => isActiveLink(l));
}

export const NavLink: React.FunctionComponent<NavLinkProps> = ({
  subLinks = [],
  children,
  link,
  isNew,
}) => {
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
        role="link"
        sx={buttonSx}
        variant="text"
        link={link}
        onClick={hasSubLinks ? handlePopoverOpen : undefined}
        className={
          isPopoverOpen
            ? OPEN_CLASS
            : isActiveLink(
                link,
                subLinks?.map((l) => l.text),
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
                key={subLink.text}
                role="link"
                variant="text"
                sx={subMenuButtonSx}
                link={subLink.link}
                onClick={handlePopoverClose}
                startIcon={subLink.isNew ? newLinkIndicator : null}
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
