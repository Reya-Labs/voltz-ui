import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

export type MaturityInformationProps = {
  startDate: DateTime | null;
  endDate: DateTime | null;
};

const MaturityInformation: React.FunctionComponent<MaturityInformationProps> = ({
  startDate,
  endDate,
}) => {
  return null;
};

export default MaturityInformation;
