import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@contexts';
import TokenAndText from './TokenAndText';

export default {
  title: 'Atomic/TokenAndText',
  component: TokenAndText,
  argTypes: {},
} as ComponentMeta<typeof TokenAndText>;

const Template: ComponentStory<typeof TokenAndText> = (args) => (
  <AgentProvider>
    <TokenAndText {...args} />
  </AgentProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  token: 'GIL',
  tokenLabel: 'pool',
  text: 'RECEIVED!',
  textLabel: 'status'
};
