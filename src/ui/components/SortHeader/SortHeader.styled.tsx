import styled from '@emotion/styled';
import { Typography } from 'brokoli-ui';

export const RowsBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};
`;

export const TypographyWithIcon = styled(Typography)`
  display: inline-flex;
  align-items: center;
`;
