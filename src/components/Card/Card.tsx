import React from 'react';
import { styled } from '@mui/system';
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';

import { colors } from '@theme';

export type CardProps = MuiCardProps;

const Card: React.FunctionComponent<CardProps> = ({ ...props }) => {
  return <MuiCard {...props} />;
};

export default styled(Card)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));
