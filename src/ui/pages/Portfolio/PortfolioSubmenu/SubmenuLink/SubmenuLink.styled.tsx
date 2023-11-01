import styled from '@emotion/styled';
import { getResponsiveTypographyStyleFromToken } from 'brokoli-ui';
import { Link } from 'react-router-dom';

export const SubmenuLinkStyled = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{
  disabled: boolean;
}>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  gap: 16px;

  ${({ theme }) =>
    getResponsiveTypographyStyleFromToken({ theme, token: 'primaryBodyMediumRegular' })};

  color: ${({ theme }) => theme.colors.white400};
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.black800};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};

  & path {
    stroke: ${({ theme }) => theme.colors.white400};
  }

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.white900};
    color: ${({ theme }) => theme.colors.white100};
  }
  &:hover path {
    stroke: ${({ theme }) => theme.colors.white100};
  }
`;

export const ActiveSubmenuLink = styled(SubmenuLinkStyled)`
  text-decoration: none;
  background: ${({ theme }) => theme.colors.white900};
  color: ${({ theme }) => theme.colors.white100};
  & path {
    stroke: ${({ theme }) => theme.colors.white100};
  }
`;
