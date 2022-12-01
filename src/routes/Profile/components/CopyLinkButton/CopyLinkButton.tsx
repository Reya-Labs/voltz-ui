import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react';

import { BouncedLoading } from '../../../../components/atomic/BouncedLoading/BouncedLoading';
import { Tick } from '../../../../components/atomic/Tick/Tick';
import {
  CopyLinkButton as CopyLinkButtonUI,
  CopyLinkErrorTypography,
  IconWrapper,
} from './CopyLinkButton.styled';

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
        disabled={DISABLED_MAP[mode]}
        onClick={onClick}
      >
        {MODE_COPY_MAP[mode]}
        {(mode === 'copy' || mode === 'copyError') && (
          <IconWrapper>
            <ContentCopyIcon fontSize="inherit" />
          </IconWrapper>
        )}
        {mode === 'copied' && (
          <IconWrapper>
            <Tick />
          </IconWrapper>
        )}
        {mode === 'copying' && <BouncedLoading />}
      </CopyLinkButtonUI>
      {mode === 'copyError' && <CopyLinkErrorTypography>Oops, try again</CopyLinkErrorTypography>}
    </>
  );
};
