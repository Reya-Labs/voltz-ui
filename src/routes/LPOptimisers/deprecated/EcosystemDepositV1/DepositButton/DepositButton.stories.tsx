import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { DepositButton } from './DepositButton';

export default {
  title: 'Interface/DepositButton',
  component: DepositButton,
  args: {},
} as ComponentMeta<typeof DepositButton>;

const Template: ComponentStory<typeof DepositButton> = (args) => (
  <div
    style={{
      display: 'flex',
      width: 'calc(100% - 200px)',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    }}
  >
    <DepositButton {...args} />
  </div>
);

export const Default = Template.bind({});
const args: React.ComponentProps<typeof DepositButton> = {
  disabled: false,
  success: false,
  loading: false,
  children: 'Deposit',
};
Default.args = args;
