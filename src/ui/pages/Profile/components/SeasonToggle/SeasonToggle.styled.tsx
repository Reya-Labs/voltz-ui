import styled from '@emotion/styled';

export const PillsBox = styled('div')`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const PillBox = styled('div')`
  margin-left: -2px;
  transition: opacity 300ms ease-in-out;
  opacity: 0.9;
  z-index: 1;
  &:hover {
    opacity: 1;
  }
`;
