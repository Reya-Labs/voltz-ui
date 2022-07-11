import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PositionBadge from './PositionBadge';

export default {
  title: 'Atomic/PositionBadge',
  component: PositionBadge,
} as ComponentMeta<typeof PositionBadge>;

const Template: ComponentStory<typeof PositionBadge> = (args) => <PositionBadge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'FT'
};
