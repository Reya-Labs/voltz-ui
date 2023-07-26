import styled from '@emotion/styled';

import { ReactComponent as DAI } from './assets/dai.svg';
import { ReactComponent as ETH } from './assets/eth.svg';
import { ReactComponent as Other } from './assets/other.svg';
import { ReactComponent as USDC } from './assets/usdc.svg';

export const Row = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftSide = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const RightSide = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const DaiIcon = styled(DAI)`
  width: 20px;
  height: 20px;
`;

export const EthIcon = styled(ETH)`
  width: 20px;
  height: 20px;
`;

export const OtherIcon = styled(Other)`
  width: 20px;
  height: 20px;
`;

export const UsdcIcon = styled(USDC)`
  width: 20px;
  height: 20px;
`;
