import { Typography } from 'brokoli-ui';
import React from 'react';

import { Ellipsis } from '../../../components/atomic/Ellipsis/Ellipsis';

export const Form: React.FunctionComponent = () => {
  return (
    <Typography typographyToken="primaryBodyExtraLargeRegular">
      Engineers at work 👨🛠📋 <Ellipsis />
    </Typography>
  );
};
