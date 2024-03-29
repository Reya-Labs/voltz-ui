import styled from '@emotion/styled';

export const ChartBox = styled('div')`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.white800};
`;

export const LineChartBox = styled('div')`
  flex: 1;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.colors.white900};
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
`;

export const RainbowLoaderBox = styled('div')`
  width: 335px;
`;
