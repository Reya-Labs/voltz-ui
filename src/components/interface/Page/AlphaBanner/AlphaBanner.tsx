import React from 'react';
import {
  BannerTypographySkyBlueCrayola,
  BannerTypographyUltramarineBlue,
  BannerTypographyWildStrawberry,
  BannerBox,
  BannerContainer,
} from './AlphaBanner.styled';

const Text: React.FunctionComponent = React.memo(() => (
  <>
    <BannerTypographyWildStrawberry variant="body2">Voltz alpha</BannerTypographyWildStrawberry>
    <BannerTypographyUltramarineBlue variant="body2">Voltz alpha</BannerTypographyUltramarineBlue>
    <BannerTypographySkyBlueCrayola variant="body2">
      Currently in alpha launch. LFG
    </BannerTypographySkyBlueCrayola>
  </>
));

export const AlphaBanner: React.FunctionComponent = React.memo(() => (
  <BannerContainer aria-label="Voltz alpha - Currently in alpha launch. LFG.">
    <BannerBox>
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
