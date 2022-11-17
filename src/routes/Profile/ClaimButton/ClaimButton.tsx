import React, { useCallback, useRef, useState } from 'react';
import {
  ClaimedAtTypography,
  ClaimButton as ClaimButtonUI,
  StretchClaimButton,
  TickWrapper,
  ClaimErrorTypography,
} from './ClaimButton.styled';
import { Confetti } from './Confetti/Confetti';
import { Tick } from './Tick/Tick';
import { BouncedLoading } from './BouncedLoading/BouncedLoading';
import { formatPOSIXTimestamp } from '@utilities';

type ClaimButtonMode = 'claim' | 'claimed' | 'claiming' | 'claimedDate' | 'claimError';

export type ClaimButtonProps = {
  mode: ClaimButtonMode;
  claimedAt?: number;
  onClick?: () => void;
  displayError: boolean;
};

const MODE_COPY_MAP: Record<ClaimButtonProps['mode'], string> = {
  claim: 'Claim',
  claimed: 'Claimed',
  claimError: 'Claim',
  claiming: 'Claiming',
  claimedDate: 'Claimed:',
};

const DISABLED_MAP: Record<ClaimButtonProps['mode'], boolean> = {
  claim: false,
  claimed: true,
  claimError: false,
  claiming: true,
  claimedDate: true,
};

export const ClaimButton: React.FunctionComponent<ClaimButtonProps> = ({
  onClick,
  mode,
  claimedAt,
  displayError,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const initialModeRef = useRef<ClaimButtonMode>(mode);
  const ButtonUI = mode === 'claimedDate' ? StretchClaimButton : ClaimButtonUI;
  const Wrapper = showConfetti ? Confetti : React.Fragment;
  const handleTickAnimationEnd = useCallback(() => {
    setShowConfetti(initialModeRef.current !== 'claimed');
  }, []);

  return (
    <>
      <ButtonUI data-testid="ClaimButton" onClick={onClick} disabled={DISABLED_MAP[mode]}>
        <Wrapper>{MODE_COPY_MAP[mode]}</Wrapper>
        {mode === 'claimed' && (
          <TickWrapper>
            <Tick onAnimationEnd={handleTickAnimationEnd} />
          </TickWrapper>
        )}
        {mode === 'claiming' && <BouncedLoading />}
        {mode === 'claimedDate' && claimedAt && (
          <ClaimedAtTypography>{formatPOSIXTimestamp(claimedAt)}</ClaimedAtTypography>
        )}
      </ButtonUI>
      {mode === 'claimError' && displayError && (
        <ClaimErrorTypography>Error when claiming, try again</ClaimErrorTypography>
      )}
    </>
  );
};
