import styled from '@emotion/styled';
import { shouldNotForwardProps, Typography } from 'brokoli-ui';

export const RowsBox = styled('div', shouldNotForwardProps(['disabled']))<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};
`;

export const TypographyWithIcon = styled(Typography)`
  display: inline-flex;
  align-items: center;
`;
