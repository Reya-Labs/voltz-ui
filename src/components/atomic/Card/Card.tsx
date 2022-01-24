import React from 'react';
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';

export type CardProps = MuiCardProps;

const Card: React.FunctionComponent<CardProps> = ({ ...props }) => {
  return <MuiCard {...props} />;
};

export default Card;
