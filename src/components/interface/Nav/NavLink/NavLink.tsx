import { Button } from '@components/atomic';
import React from 'react';
import { buttonGroupSx, buttonSx, popoverOverrideSx, subMenuButtonSx } from './style';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';

type NavLinkProps = {
  link?: string;
  subLinks?: {
    text: string;
    link: string;
  }[];
};

export const NavLink: React.FunctionComponent<NavLinkProps> = ({
  subLinks = [],
  children,
  link,
}) => {
  const hasSubLinks = subLinks && subLinks.length !== 0;
  const [anchorPopoverElement, setAnchorPopoverElement] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPopoverElement(event.currentTarget);
  };

  const handlePopoverClose = () => setAnchorPopoverElement(null);

  const isPopoverOpen = Boolean(anchorPopoverElement);
  return (
    <React.Fragment>
      <Button
        role="link"
        sx={buttonSx}
        variant="text"
        link={link}
        onClick={hasSubLinks ? handlePopoverOpen : undefined}
        className={isPopoverOpen ? 'open' : undefined}
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
              <Button role="link" variant="text" sx={subMenuButtonSx} link={subLink.link}>
                {subLink.text}
              </Button>
            ))}
          </ButtonGroup>
        </Popover>
      ) : null}
    </React.Fragment>
  );
};
