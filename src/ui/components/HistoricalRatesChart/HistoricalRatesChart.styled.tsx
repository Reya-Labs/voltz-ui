import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const ChartBox = styled('div')`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  border-bottom: 1px solid ${colors.lavenderWeb8};
`;

export const LineChartBox = styled('div')`
  flex: 1;
  box-sizing: border-box;
  border-right: 1px solid ${colors.lavenderWeb8};
`;

export const LoadingBox = styled('div')`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(11, 9, 17, 0.8) 41.43%, rgba(24, 21, 36, 0.8) 110.49%);
  backdrop-filter: blur(2px);
`;

export const RainbowLoaderBox = styled('div')`
  width: 335px;
`;
