import React, { ReactNode } from 'react';
import { SystemStyleObject, Theme } from '../../../theme';
import { Typography } from '../../atomic/Typography/Typography';
import CircleIcon from '@mui/icons-material/Circle';

export type BulletLabelProps = {
  sx?: SystemStyleObject<Theme>;
  text?: ReactNode;
};

const labelStyles: SystemStyleObject<Theme> = {
  fontSize: '14px',
  lineHeight: '1',
  textTransform: 'uppercase',
  display: 'flex',
  verticalAlign: 'middle',
};

export const BulletLabel: React.FunctionComponent<BulletLabelProps> = ({ sx = {}, text }) => {
  return (
    <Typography variant="body2" sx={{ ...labelStyles, ...sx }}>
      <CircleIcon
        sx={{
          width: 4,
          height: 14,
          borderRadius: '16px',
          marginRight: (theme) => theme.spacing(2),
        }}
      />
      {text}
    </Typography>
  );
};
