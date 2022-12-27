import React from 'react';

import { LoadingBox } from './Loading.styled';

export const Loading: React.FunctionComponent = React.memo(() => (
  <LoadingBox data-testid="Loading-Box" />
));
