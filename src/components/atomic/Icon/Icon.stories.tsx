import { styled } from '@mui/material/styles';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Icon } from './Icon';
import { iconMap, SupportedIcons } from './types';

export default {
  title: 'Atomic/Icon',
  component: Icon,
  args: {},
} as ComponentMeta<typeof React.Fragment>;

const IconWrapperDiv = styled('div')`
  flex: 1;
  & > svg {
    font-size: 10rem;
  }
`;

const AllIconsWrapperDiv = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 4px;
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
