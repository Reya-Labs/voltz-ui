import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OptionButtonGroup from './OptionButtonGroup';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Composite/OptionButtonGroup',
  component: OptionButtonGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof OptionButtonGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OptionButtonGroup> = (args) => <OptionButtonGroup {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  options: ['FIXED', 'VARIABLE'],
  onChange: (option: string) => null,
};
