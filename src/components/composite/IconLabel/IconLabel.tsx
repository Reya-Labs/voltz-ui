import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import isNull from 'lodash/isNull';
import upperCase from 'lodash/upperCase';

import { Icon, Icons, Panel, Typography } from '@components/atomic';

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
            '&.MuiPaper-root': {
              backgroundColor: 'transparent',
              color: 'unset',
              backgroundImage: 'unset',
              boxShadow: 'unset',
              borderRadius: 0,
              overflow: 'hidden',
            },
          }}
          open={open}
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
          <Panel variant="dark" sx={{ borderRadius: 1, maxWidth: 200 }}>
            <Typography variant="caption">{info}</Typography>
          </Panel>
          <Box
            sx={{
              backgroundColor: 'transparent',
              color: 'unset',
              backgroundImage: 'unset',
              boxShadow: 'unset',
              position: 'relative',
              mt: '10px',
              '&::before': {
                backgroundColor: 'secondary.darken045',
                content: '""',
                display: 'block',
                position: 'absolute',
                width: 12,
                height: 12,
                top: -16,
                zIndex: -1,
                transform: 'rotate(45deg)',
                left: 'calc(50% - 6px)',
              },
            }}
          />
        </Popover>
      )}
    </>
  );
};

export default IconLabel;
