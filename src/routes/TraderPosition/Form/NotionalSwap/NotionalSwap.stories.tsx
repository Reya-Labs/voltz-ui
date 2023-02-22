import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { NotionalSwap } from './index';

export default {
  title: 'VoltzUI/NotionalSwap',
  component: NotionalSwap,
  args: {},
} as ComponentMeta<typeof NotionalSwap>;

const Template: ComponentStory<typeof NotionalSwap> = (args) => {
  const [mode, setMode] = useState<'fixed' | 'variable'>('fixed');
  return <NotionalSwap {...args} mode={mode} onSwap={setMode} />;
};

export const Default = Template.bind({});
Default.args = {
  fixedRate: 5.49,
  variableRate: 2.49,
  mode: 'fixed',
};
