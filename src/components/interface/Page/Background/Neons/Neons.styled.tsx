import { styled } from '@mui/material/styles';

import { ReactComponent as NeonBoxInnerSvg } from './neon-inner.svg';
import { ReactComponent as NeonBoxOuterSvg } from './neon-outer.svg';

export const NeonBoxInner = styled(NeonBoxInnerSvg)`
  position: absolute;
  left: 42.92%;
  top: -66px;
`;

export const NeonBoxOuter = styled(NeonBoxOuterSvg)`
  position: absolute;
  left: 46.46%;
  top: -80px;
`;
