import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Panel from './Panel';

export default {
  title: 'Atomic/Panel',
  component: Panel,
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'APE',
};
