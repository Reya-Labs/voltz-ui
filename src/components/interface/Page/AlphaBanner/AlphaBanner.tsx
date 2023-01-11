import React from 'react';

import {
  BannerBox,
  BannerContainer,
  BannerTypographySkyBlueCrayola,
  BannerTypographyUltramarineBlue,
  BannerTypographyWildStrawberry,
} from './AlphaBanner.styled';

const Text: React.FunctionComponent = React.memo(() => (
  <>
    <BannerTypographyWildStrawberry data-testid="AlphaBanner-Text1" variant="body2">
      Voltz alpha
    </BannerTypographyWildStrawberry>
    <BannerTypographyUltramarineBlue data-testid="AlphaBanner-Text2" variant="body2">
      Voltz alpha
    </BannerTypographyUltramarineBlue>
    <BannerTypographySkyBlueCrayola data-testid="AlphaBanner-Text3" variant="body2">
      Currently in alpha launch. LFG
    </BannerTypographySkyBlueCrayola>
  </>
));

export const AlphaBanner: React.FunctionComponent = React.memo(() => (
  <BannerContainer
    aria-label="Voltz alpha - Currently in alpha launch. LFG."
    data-testid="AlphaBanner-BannerContainer"
  >
    <BannerBox data-testid="AlphaBanner-BannerBox">
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
    </BannerBox>
  </BannerContainer>
));
