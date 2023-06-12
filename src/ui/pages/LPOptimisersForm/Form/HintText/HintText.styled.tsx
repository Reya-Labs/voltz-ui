import styled from '@emotion/styled';

import { colors } from '../../../../../theme';

export const BaseTextSpan = styled('span')`
  color: inherit;
`;
export const ErrorTextSpan = styled('span')`
  color: ${colors.wildStrawberry.base};
`;
export const SuccessTextSpan = styled('span')`
  color: ${colors.skyBlueCrayola.base};
`;
export const WarningTextSpan = styled('span')`
  color: ${colors.orangeYellow.base};
`;
