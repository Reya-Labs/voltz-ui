import styled from '@emotion/styled';

export const PageSectionBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const RightPageSectionBox = styled('div')`
  box-sizing: border-box;
  flex: 1;

  display: flex;
  flex-direction: column;
`;

export const MainAndFormSectionBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const MainSectionBox = styled('div')`
  box-sizing: border-box;
  flex: 1;
  height: 100%;
`;
export const RightSectionBox = styled('div')`
  box-sizing: border-box;
  width: 416px;
  height: calc(100vh - 55px);

  background: linear-gradient(180deg, rgba(11, 9, 17, 0.8) 41.43%, rgba(24, 21, 36, 0.8) 110.49%);
  backdrop-filter: blur(2px);
`;

export const LoadingBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: transparent;
`;
