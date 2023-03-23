import { RainbowLoader } from 'brokoli-ui';
import * as React from 'react';

import { LoadingBox, RainbowLoadingBox } from '../../pages/LPForm/LPForm.styled';

export const PageLoading: React.FunctionComponent = React.memo(() => (
  <LoadingBox data-testid="PageLoading-LoadingBox">
    <RainbowLoadingBox data-testid="PageLoading-RainbowLoadingBox">
      <RainbowLoader
        data-testid="PageLoading-RainbowLoader"
        height={2}
        text="Fetching best rates..."
      />
    </RainbowLoadingBox>
  </LoadingBox>
));
