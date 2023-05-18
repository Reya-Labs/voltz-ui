import styled from '@emotion/styled';

export const LearnMoreAboutVoyageBox = styled('div')`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const TitleBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
`;

export const StepBox = styled('div')`
  width: 100%;
  border-radius: 4px;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

export const TextBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  height: 100px;
`;

export const PaginationBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;
