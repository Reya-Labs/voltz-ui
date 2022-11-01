import React, { useCallback, useState } from 'react';
import {
  ClaimedAtTypography,
  ClaimButton as ClaimButtonUI,
  TickWrapper,
} from './ClaimButton.styled';
import { Confetti } from './Confetti/Confetti';
import { Tick } from './Tick/Tick';
import { BouncedLoading } from './BouncedLoading/BouncedLoading';

type ClaimButtonMode = 'claim' | 'claimed' | 'claiming' | 'claimedDate';

type ClaimButtonProps = {
  mode: ClaimButtonMode;
  claimedAt?: string;
};

const MODE_COPY_MAP: Record<ClaimButtonProps['mode'], string> = {
  claim: 'Claim',
  claimed: 'Claimed',
  claiming: 'Claiming',
  claimedDate: 'Claimed:',
};

export const ClaimButton: React.FunctionComponent<ClaimButtonProps> = ({ mode, claimedAt }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const Wrapper = showConfetti ? Confetti : React.Fragment;
  const handleTickAnimationEnd = useCallback(() => {
    setShowConfetti(true);
  }, []);

  return (
    <ClaimButtonUI stretch={mode === 'claimedDate'} disabled={mode !== 'claim'}>
      <Wrapper>{MODE_COPY_MAP[mode]}</Wrapper>
      {mode === 'claimed' && (
        <TickWrapper>
          <Tick onAnimationEnd={handleTickAnimationEnd} />
        </TickWrapper>
      )}
      {mode === 'claiming' && <BouncedLoading />}
      {mode === 'claimedDate' && <ClaimedAtTypography>{claimedAt}</ClaimedAtTypography>}
    </ClaimButtonUI>
  );
};
