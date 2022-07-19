import React, { ReactNode } from 'react';
import { Box, SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';
import colors from '../../../theme/colors';

interface SummaryPanelProps {
  label?: ReactNode;
  loading?: boolean;
  rows?: {label: string; value: ReactNode, highlight?: boolean}[];
}

const SummaryPanel = ({ label, loading, rows }: SummaryPanelProps) => {
  const rowStyles: SystemStyleObject<Theme> = {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    width: '100%',
    lineHeight: '1',
    marginBottom: (theme) => theme.spacing(2),

    '&:last-child': {
      marginBottom: '0'
    },
    'label': {
      color: colors.lavenderWeb.base,
      fontSize: '14px',
      marginBottom: (theme) => theme.spacing(4)
    },
    'svg': {
      color: colors.lavenderWeb.base,
    }
  };
  const valueStyles: SystemStyleObject<Theme> = {
    fontSize: '12px',
    lineHeight: '1',
  };

  if (loading) {
    return <Typography agentStyling variant="body2">Loading...</Typography>
  }

  if (rows) {
    return (
      <Box>
        {rows.map((row, index) => (
          <Box sx={rowStyles} key={row.label}>
            <Typography 
              variant="body2" 
              label={index === 0 ? label : undefined} 
              sx={{
                ...valueStyles, 
                color: (row.highlight) ? colors.lavenderWeb.base : colors.lavenderWeb.darken015,
              }}
            >
              {row.label}
            </Typography>
            <Typography agentStyling={row.highlight} variant="body2" sx={{
              ...valueStyles,
              color: row.highlight ? undefined : colors.lavenderWeb.darken015,
              whiteSpace: 'nowrap',
            }}>
              {row.value}
            </Typography>
          </Box>
        ))}
      </Box>
    )
  }

  return null;
}

export default SummaryPanel;