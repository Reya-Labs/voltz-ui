import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@mui/system';
import { ReactNode } from 'react';

import { colors } from '../../../theme';
import { Typography } from '../Typography/Typography';

interface SummaryPanelProps {
  label?: ReactNode;
  loading?: boolean;
  rows?: { label: string; value: ReactNode; highlight?: boolean; bold?: boolean }[];
}

export const SummaryPanel = ({ label, loading, rows }: SummaryPanelProps) => {
  const rowStyles: SystemStyleObject<Theme> = {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    width: '100%',
    lineHeight: '1',
    marginBottom: (theme) => theme.spacing(2),

    '&:last-child': {
      marginBottom: '0',
    },
    label: {
      color: colors.lavenderWeb,
      fontSize: '14px',
      marginBottom: (theme) => theme.spacing(4),
    },
    svg: {
      color: colors.lavenderWeb,
    },
  };
  const valueStyles: SystemStyleObject<Theme> = {
    fontSize: '12px',
    lineHeight: '1',
  };

  if (loading) {
    return (
      <Typography sx={{ color: colors.skyBlueCrayola }} variant="body2">
        Loading...
      </Typography>
    );
  }

  if (rows) {
    return (
      <Box>
        {rows.map((row, index) => (
          <Box key={row.label} sx={rowStyles}>
            <Typography
              label={index === 0 ? label : undefined}
              sx={{
                ...valueStyles,
                color: row.highlight ? colors.lavenderWeb : colors.lavenderWeb2,
                fontWeight: row.bold ? 'bold' : undefined,
              }}
              variant="body2"
            >
              {row.label}
            </Typography>
            <Typography
              sx={{
                ...valueStyles,
                color: row.highlight ? colors.skyBlueCrayola : colors.lavenderWeb2,
                fontWeight: row.bold ? 'bold' : undefined,
                whiteSpace: 'nowrap',
              }}
              variant="body2"
            >
              {row.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }

  return null;
};
