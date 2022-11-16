import React from 'react';
import {
  CopyLinkButton as CopyLinkButtonUI,
  TickWrapper,
  CopyLinkErrorTypography,
} from './CopyLinkButton.styled';
import { Tick } from '../Tick/Tick';
import { BouncedLoading } from '../BouncedLoading/BouncedLoading';

type CopyLinkButtonMode = 'copy' | 'copying' | 'copied' | 'copyError';

export type CopyLinkButtonProps = {
  mode: CopyLinkButtonMode;
  onClick?: () => void;
};

const MODE_COPY_MAP: Record<CopyLinkButtonProps['mode'], string> = {
  copy: 'Copy Link',
  copied: 'Copied',
  copyError: 'Copy Link',
  copying: 'Copying',
};

const DISABLED_MAP: Record<CopyLinkButtonProps['mode'], boolean> = {
  copy: false,
  copied: true,
  copyError: false,
  copying: true,
};

export const CopyLinkButton: React.FunctionComponent<CopyLinkButtonProps> = ({ onClick, mode }) => {
  return (
    <>
      <CopyLinkButtonUI
        data-testid="CopyLinkButton"
        onClick={onClick}
        disabled={DISABLED_MAP[mode]}
      >
        {MODE_COPY_MAP[mode]}
        {mode === 'copied' && (
          <TickWrapper>
            <Tick />
          </TickWrapper>
        )}
        {mode === 'copying' && <BouncedLoading />}
      </CopyLinkButtonUI>
      {mode === 'copyError' && (
        <CopyLinkErrorTypography>Error when copying, try again</CopyLinkErrorTypography>
      )}
    </>
  );
};
