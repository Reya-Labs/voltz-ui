import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@contexts';
import SummaryPanel from './SummaryPanel';

export default {
  title: 'Atomic/SummaryPanel',
  component: SummaryPanel,
} as ComponentMeta<typeof SummaryPanel>;

const Template: ComponentStory<typeof SummaryPanel> = (args) => (
  <AgentProvider>
    <SummaryPanel {...args} />
  </AgentProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'TRADE INFO',
  loading: false,
  rows: [
    {
      label: 'NOTIONAL AVAILABLE:',
      value: '50030.77 USDC',
    },
    {
      label: 'AVERAGE FIXED RATE:',
      value: '44.53 %',
    },
    {
      label: 'FEES:',
      value: '20 USDC',
    },
  ],
};
