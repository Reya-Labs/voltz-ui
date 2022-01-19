import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

export type MaturityInformationProps = {
  startDate?: DateTime;
  endDate?: DateTime;
};

const MaturityInformation: React.FunctionComponent<MaturityInformationProps> = ({
  startDate,
  endDate,
}) => {
  return null;
};

export default MaturityInformation;
