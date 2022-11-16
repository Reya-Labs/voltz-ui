import React from 'react';
import { IconAnimated, TickPart2, TickPart1, TickContainer } from './Tick.styled';

type TickProps = {
  onAnimationEnd?: () => void;
};

export const Tick: React.FunctionComponent<TickProps> = React.memo(({ onAnimationEnd }) => {
  return (
    <IconAnimated>
      <TickContainer>
        <TickPart1
          onAnimationEnd={onAnimationEnd}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 52"
        >
          <polygon className="" points="1,41 0,48 25,52 25,45" />
        </TickPart1>
        <TickPart2 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 52">
          <polygon className="" points="18,45 25,47 25,0 18,0" />
        </TickPart2>
      </TickContainer>
    </IconAnimated>
  );
});
