import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelAlert from './PanelAlert';

export default {
  title: 'Composite/PanelAlert',
  component: PanelAlert,
} as ComponentMeta<typeof PanelAlert>;

const Template: ComponentStory<typeof PanelAlert> = (args) => <PanelAlert {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'This is an error message to let you know that something has gone wrong',
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'warning',
  message:
    'This is a danger message to warn you to check the data you have entered carefully before continuing',
};
