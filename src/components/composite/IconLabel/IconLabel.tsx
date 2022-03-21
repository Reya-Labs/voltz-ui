import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import isNull from 'lodash/isNull';
import upperCase from 'lodash/upperCase';

import { Icon, Icons, Typography } from '@components/atomic';

export type IconLabelProps = {
  label: string;
  icon: Icons;
  info?: string;
};

const IconLabel: React.FunctionComponent<IconLabelProps> = ({ label, icon, info }) => {
  const [anchor, setAnchor] = useState<SVGElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<SVGElement>) => {
    setAnchor(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchor(null);
  };
  const open = !isNull(anchor);

  return (
    <>
      {upperCase(label)}
      <Icon
        name={icon}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ height: 10, width: 10, position: 'relative', top: 1, left: 10 }}
      />
      {info && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={true}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{info}</Typography>
        </Popover>
      )}
    </>
  );
};

export default IconLabel;
