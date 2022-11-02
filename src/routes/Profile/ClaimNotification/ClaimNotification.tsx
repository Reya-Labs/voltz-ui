import { ClaimTypography, PillBox } from './ClaimNotification.styled';
import React from 'react';

type ClaimNotificationProps = {
  text: React.ReactNode;
  ctaText: string;
};
export const ClaimNotification: React.FunctionComponent<ClaimNotificationProps> = ({
  ctaText,
  text,
}) => (
  <ClaimTypography data-testid="ClaimNotification" variant="body2">
    <PillBox text={ctaText} variant="wildStrawberry" />
    {text}
  </ClaimTypography>
);
