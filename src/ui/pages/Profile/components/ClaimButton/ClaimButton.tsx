import { Confetti } from 'brokoli-ui';
import React, { useEffect, useRef, useState } from 'react';

import { formatPOSIXTimestamp } from '../../../../../utilities/date';
import { ClaimButtonStyled, ClaimedAtTypography } from './ClaimButton.styled';

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
  const Wrapper = showConfetti ? Confetti : React.Fragment;
  useEffect(() => {
    setShowConfetti(mode === 'claimed' && initialModeRef.current !== 'claimed');
  }, [mode]);
  const copyMap = {
    ...MODE_COPY_MAP,
    ...copies,
  };

  return (
    <Wrapper>
      <ClaimButtonStyled
        bottomLeftText={
          mode === 'claimError' && displayError ? 'Error when claiming, try again' : ''
        }
        bottomLeftTextColorToken="wildStrawberry"
        bottomLeftTextTypographyToken="primaryBodySmallRegular"
        data-testid={`ClaimButton-ClaimButtonStyled-${mode}`}
        disabled={DISABLED_MAP[mode]}
        loading={mode === 'claiming'}
        typographyToken="primaryBodySmallBold"
        variant="primary"
        onClick={onClick}
      >
        {copyMap[mode]}
        {mode === 'claimedDate' && claimedAt && (
          <ClaimedAtTypography data-testid="ClaimButton-ClaimedAtTypography">
            {formatPOSIXTimestamp(claimedAt)}
          </ClaimedAtTypography>
        )}
      </ClaimButtonStyled>
    </Wrapper>
  );
};
