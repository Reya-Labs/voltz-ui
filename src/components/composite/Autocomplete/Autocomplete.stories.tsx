import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Autocomplete from './Autocomplete';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Composite/Autocomplete',
  component: Autocomplete,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Autocomplete>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Autocomplete> = (args) => <Autocomplete {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
