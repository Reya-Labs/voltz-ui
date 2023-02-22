import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@mui/system';

import { colors } from '../../../theme';
import { IconLabel } from '../../composite/IconLabel/IconLabel';
import { Typography } from '../Typography/Typography';

type PositionBadgeVariant = 'FT' | 'VT' | 'LP' | 'FC';

export type PositionBadgeProps = {
  sx?: SystemStyleObject<Theme>;
  size?: 'small' | 'medium';
  text?: string;
  variant?: PositionBadgeVariant;
  isBothTraderAndLP: boolean;
};

const labels: Record<PositionBadgeVariant, string> = {
  FT: 'Fixed taker',
  VT: 'Variable taker',
  LP: 'Liquidity provider',
  FC: 'Fully collateralised',
};

const baseStyles: SystemStyleObject<Theme> = {
  border: '1px solid transparent',
  display: 'inline-block',
  padding: (theme) => theme.spacing(1, 2),
  textTransform: 'uppercase',
  borderRadius: '4px',
  fontFamily: 'PixelOperatorMono',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '14px',
};

const styles: Record<PositionBadgeVariant, SystemStyleObject<Theme>> = {
  FT: {
    ...baseStyles,
    borderColor: 'primary.base',
    color: 'primary.base',
    background: colors.skyBlueCrayola.darken030,
  },
  VT: {
    ...baseStyles,
    borderColor: 'secondary.base',
    color: 'secondary.base',
    background: 'tertiary.base',
  },
  LP: {
    ...baseStyles,
    borderColor: colors.lavenderWeb.darken045,
    color: colors.skyBlueCrayola.base,
    /* Liberty 6 */
    background: '#19152A',
  },
  FC: {
    ...baseStyles,
    borderColor: 'primary.base',
    color: 'primary.base',
    background: 'transparent',
  },
};

/**
 * Returns the 2 letter variant for a position type
 * @param positionType - positionType from your position (1, 2 or 3)
 */
export const getPositionBadgeVariant = (positionType: number) => {
  switch (positionType) {
    case 1:
      return 'FT';
    case 2:
      return 'VT';
    case 3:
      return 'LP';
  }
};

export const PositionBadge = ({
  size = 'medium',
  sx = {},
  text,
  variant,
  isBothTraderAndLP,
}: PositionBadgeProps) => {
  if (variant)
    return (
      <Box sx={{ ...sx, ...styles[variant] }}>
        <Typography
          sx={{ color: 'unset', fontSize: size === 'small' ? '12px' : '14px', lineHeight: '1' }}
          variant="body2"
        >
          {isBothTraderAndLP ? (
            <IconLabel
              icon="information-circle"
              info={
                'Note that for this pool, the margin of your trade positions will be shared with the margin of your LP position opened between 1% and 997.9%, since this represents the default range for trade positions.'
              }
              label={text || labels[variant]}
            />
          ) : (
            text || labels[variant]
          )}
        </Typography>
      </Box>
    );

  return null;
};
