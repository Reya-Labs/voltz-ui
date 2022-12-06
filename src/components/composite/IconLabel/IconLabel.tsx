import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import React, { ReactNode, useState } from 'react';

import { SystemStyleObject, Theme } from '../../../theme';
import { Icon } from '../../atomic/Icon/Icon';
import { Icons } from '../../atomic/Icon/types';
import { Panel } from '../../atomic/Panel/Panel';
import { Typography } from '../../atomic/Typography/Typography';

export type IconLabelProps = {
  label: string | ReactNode;
  icon: Icons;
  info?: ReactNode;
  removeIcon?: boolean;
  iconSx?: SystemStyleObject<Theme>;
};

export const IconLabel: React.FunctionComponent<IconLabelProps> = ({
  label,
  icon,
  info,
  removeIcon,
  iconSx = {},
}) => {
  const [anchor, setAnchor] = useState<SVGElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<SVGElement>) => {
    setAnchor(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchor(null);
  };
  const open = Boolean(anchor);

  let _display = 'inline';

  if (removeIcon) {
    _display = 'none';
  }

  return (
    <>
      {typeof label === 'string' ? label.toUpperCase() : label}
      <Icon
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        name={icon}
        sx={{
          height: 10,
          width: 10,
          position: 'relative',
          top: 1,
          marginLeft: (theme) => theme.spacing(2),
          display: _display,
          ...iconSx,
        }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      {info && (
        <Popover
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          id="mouse-over-popover"
          open={open}
          sx={{
            pointerEvents: 'none',
            '& .MuiPaper-root': {
              backgroundColor: 'transparent',
              color: 'unset',
              backgroundImage: 'unset',
              boxShadow: 'unset',
              borderRadius: 0,
              overflow: 'hidden',
            },
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          disableRestoreFocus
          onClose={handlePopoverClose}
        >
          <Panel variant="iconLabel">
            <Typography
              sx={{
                fontFamily: 'DM Sans',
                fontStyle: 'normal',
                fontSize: 12,
                lineHeight: '150%',
              }}
              variant="caption"
            >
              {info}
            </Typography>
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
