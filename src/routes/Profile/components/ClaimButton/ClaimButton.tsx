import React, { useCallback, useRef, useState } from 'react';

import { BouncedLoading } from '../../../../components/atomic/BouncedLoading/BouncedLoading';
import { Tick } from '../../../../components/atomic/Tick/Tick';
import { formatPOSIXTimestamp } from '../../../../utilities/date';
import {
  ClaimButton as ClaimButtonUI,
  ClaimedAtTypography,
  ClaimErrorTypography,
  StretchClaimButton,
  TickWrapper,
} from './ClaimButton.styled';
import { Confetti } from './Confetti/Confetti';

type ClaimButtonMode = 'claim' | 'claimed' | 'claiming' | 'claimedDate' | 'claimError';

export type ClaimButtonProps = {
  mode: ClaimButtonMode;
  claimedAt?: number;
  onClick?: () => void;
  displayError: boolean;
  copies?: Partial<Record<ClaimButtonProps['mode'], string>>;
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
  copies,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const initialModeRef = useRef<ClaimButtonMode>(mode);
  const ButtonUI = mode === 'claimedDate' ? StretchClaimButton : ClaimButtonUI;
  const Wrapper = showConfetti ? Confetti : React.Fragment;
  const handleTickAnimationEnd = useCallback(() => {
    setShowConfetti(initialModeRef.current !== 'claimed');
  }, []);
  const copyMap = {
    ...MODE_COPY_MAP,
    ...copies,
  };

  return (
    <>
      <ButtonUI data-testid="ClaimButton" disabled={DISABLED_MAP[mode]} onClick={onClick}>
        <Wrapper>{copyMap[mode]}</Wrapper>
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
