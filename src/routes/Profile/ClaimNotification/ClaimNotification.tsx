import { ClaimTypography, PillBox } from './ClaimNotification.styled';
import React from 'react';

type ClaimNotificationProps = {
  text: React.ReactNode;
  pillText: string;
};
export const ClaimNotification: React.FunctionComponent<ClaimNotificationProps> = ({
  pillText,
  text,
}) => (
  <ClaimTypography data-testid="ClaimNotification" variant="body2">
    <PillBox text={pillText} variant="wildStrawberry" />
    {text}
  </ClaimTypography>
);
