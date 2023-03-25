import React from 'react';

import { CopyLinkButton as CopyLinkButtonUI } from './CopyLinkButton.styled';

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

export const CopyLinkButton: React.FunctionComponent<CopyLinkButtonProps> = ({ onClick, mode }) => (
  <CopyLinkButtonUI
    bottomLeftText={mode === 'copyError' ? 'Oops, try again' : ''}
    bottomLeftTextColorToken="wildStrawberry"
    bottomLeftTextTypographyToken="primaryBodySmallRegular"
    data-testid={`CopyLinkButton-CopyLinkButtonUI-${mode}`}
    disabled={DISABLED_MAP[mode]}
    loading={mode === 'copying'}
    typographyToken="primaryBodySmallBold"
    variant="primary"
    onClick={DISABLED_MAP[mode] ? undefined : onClick}
  >
    {MODE_COPY_MAP[mode]}
  </CopyLinkButtonUI>
);
