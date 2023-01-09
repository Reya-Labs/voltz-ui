import React from 'react';

import { IconAnimated, TickContainer, TickPart1, TickPart2 } from './Tick.styled';

type TickProps = {
  onAnimationEnd?: () => void;
};

export const Tick: React.FunctionComponent<TickProps> = React.memo(({ onAnimationEnd }) => (
  <IconAnimated data-testid="Tick">
    <TickContainer>
      <TickPart1
        data-testid="Tick-TickPart1"
        viewBox="0 0 25 52"
        xmlns="http://www.w3.org/2000/svg"
        onAnimationEnd={onAnimationEnd}
      >
        <polygon className="" points="1,41 0,48 25,52 25,45" />
      </TickPart1>
      <TickPart2
        data-testid="Tick-TickPart2"
        viewBox="0 0 25 52"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon className="" points="18,45 25,47 25,0 18,0" />
      </TickPart2>
    </TickContainer>
  </IconAnimated>
));
