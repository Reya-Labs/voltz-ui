import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, primaryBodyMediumRegularCSSObject } from 'brokoli-ui';
import { Link } from 'react-router-dom';

export const SubPageLinkStyled = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  gap: 16px;

  ${css(primaryBodyMediumRegularCSSObject)};

  color: ${colors.lavenderWeb3};
  text-decoration: none;
  background-color: ${colors.liberty7};
  border-radius: 2px;
  width: 100%;
  box-sizing: border-box;
  & path {
    stroke: ${colors.lavenderWeb3};
  }

  &:hover {
    text-decoration: none;
    background-color: ${colors.lavenderWeb8};
    color: ${colors.lavenderWeb};
  }
  &:hover path {
    stroke: ${colors.lavenderWeb};
  }
`;

export const ActiveSubPageLink = styled(SubPageLinkStyled)`
  text-decoration: none;
  background: ${colors.lavenderWeb8};
  color: ${colors.lavenderWeb};
  & path {
    stroke: ${colors.lavenderWeb};
  }
`;
