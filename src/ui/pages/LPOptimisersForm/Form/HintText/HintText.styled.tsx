import styled from '@emotion/styled';

export const BaseTextSpan = styled('span')`
  color: inherit;
`;
export const ErrorTextSpan = styled('span')`
  color: ${({ theme }) => theme.colors.error100};
`;
export const SuccessTextSpan = styled('span')`
  color: ${({ theme }) => theme.colors.primary100};
`;
export const WarningTextSpan = styled('span')`
  color: ${({ theme }) => theme.colors.warning100};
`;
