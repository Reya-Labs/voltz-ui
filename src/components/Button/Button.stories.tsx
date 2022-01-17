import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import withLabel from '../withLabel/withLabel';
import Button from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atomic/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'APE',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'APE',
};

const LabelTemplate: ComponentStory<typeof Button> = withLabel(
  (args) => <Button {...args} />,
  'hello',
);

export const PrimaryWithLabel = LabelTemplate.bind({});
PrimaryWithLabel.args = {
  children: 'APE',
};
