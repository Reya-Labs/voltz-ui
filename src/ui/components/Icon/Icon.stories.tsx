import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Icon } from './Icon';
import { iconMap, SupportedIcons } from './types';

export default {
  title: 'Components/Profile/Icon',
  component: Icon,
  args: {},
} as ComponentMeta<typeof React.Fragment>;

const IconWrapperDiv = styled('div')`
  width: 100px;
  height: 100px;

  & > svg {
    width: 100%;
    height: 100%;
  }
  & > img {
    width: 100%;
    height: 100%;
  }
`;

const AllIconsWrapperDiv = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  gap: 8px;
  background: white;
  z-index: 1;
  position: absolute;
  width: calc(100vw - 64px);
  height: 100vh;
  overflow-y: scroll;
`;

const IconWrapper = styled('div')`
  flex: 1;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  height: 256px;
`;

const NameSpan = styled('span')`
  font-size: 16px;
`;

const AllIconsTemplate: ComponentStory<typeof React.Fragment> = () => (
  <AllIconsWrapperDiv>
    {Object.keys(iconMap)
      .sort()
      .map((c) => (
        <IconWrapper key={c}>
          <IconWrapperDiv>
            <Icon name={c as SupportedIcons} />
          </IconWrapperDiv>
          <NameSpan>
            <b>{c}</b>
          </NameSpan>
        </IconWrapper>
      ))}
  </AllIconsWrapperDiv>
);

export const Icons = AllIconsTemplate.bind({});
Icons.args = {};
