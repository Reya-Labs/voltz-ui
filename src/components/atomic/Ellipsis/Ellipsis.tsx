import React from 'react';

import { EllipsisTypography } from './Ellipsis.styled';

export const Ellipsis: React.FunctionComponent = React.memo(() => {
  return <EllipsisTypography data-testid="EllipsisTypography" />;
});
