import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const DescriptionBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;

  background: ${colors.liberty5};
  border-radius: 4px;
`;

export const HighlightedText = styled('span')`
  color: ${colors.lavenderWeb};
`;
