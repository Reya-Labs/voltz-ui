import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ClaimButton } from './ClaimButton';
import React from 'react';

export default {
  title: 'Interface/ClaimButton',
  component: ClaimButton,
  args: {},
} as ComponentMeta<typeof ClaimButton>;

const Template: ComponentStory<typeof ClaimButton> = (args) => (
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
    <ClaimButton {...args} />
  </div>
);

export const Default = Template.bind({});
const args: React.ComponentProps<typeof ClaimButton> = {
  mode: 'claim',
  displayError: true,
};
Default.args = args;
