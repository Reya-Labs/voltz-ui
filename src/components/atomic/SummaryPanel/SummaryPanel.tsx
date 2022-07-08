import React, { ReactNode } from 'react';
import { colors, SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';

interface SummaryPanelProps {
  label?: ReactNode;
  loading?: boolean;
  rows?: {label: string; value: string}[];
}

const SummaryPanel = ({ label, loading, rows }: SummaryPanelProps) => {
  const containerStyles: SystemStyleObject<Theme> = {
    border: `1px solid ${colors.lavenderWeb.darken040}`,
    borderRadius: (theme) => theme.spacing(1),
    padding: (theme) => theme.spacing(4),
  };
  const rowStyles: SystemStyleObject<Theme> = {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    width: '100%',
  };
  const valueStyles: SystemStyleObject<Theme> = {
    whiteSpace: 'nowrap',
  };

  if (loading) {
    return <Typography agentStyling variant="body2">Loading...</Typography>
  }

  if (rows) {
    return (
      <Box sx={containerStyles}>
        {rows.map((row, index) => (
          <Box sx={rowStyles} key={row.label}>
            <Typography variant="body2" label={index === 0 ? label : undefined}>
              {row.label}
            </Typography>
            <Typography agentStyling variant="body2" sx={valueStyles}>
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