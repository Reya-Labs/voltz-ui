import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const BaseTextSpan = styled('span')`
  color: inherit;
`;
export const ErrorTextSpan = styled('span')`
  color: ${colors.wildStrawberry};
`;
export const SuccessTextSpan = styled('span')`
  color: ${colors.skyBlueCrayola};
`;
export const WarningTextSpan = styled('span')`
  color: ${colors.orangeYellow};
`;
