import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { FormActionButton } from './FormActionButton';

export default {
  title: 'Interface/FormActionButton',
  component: FormActionButton,
  args: {},
} as ComponentMeta<typeof FormActionButton>;

const Template: ComponentStory<typeof FormActionButton> = (args) => (
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
    <FormActionButton {...args} />
  </div>
);

export const Default = Template.bind({});
const args: React.ComponentProps<typeof FormActionButton> = {
  disabled: false,
  success: false,
  loading: false,
  variant: 'blue',
  children: 'Deposit',
  dataTestId: 'DepositButton',
};
Default.args = args;
