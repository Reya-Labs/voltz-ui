import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography, { TypographyProps } from '../Typography/Typography';
import Panel from './Panel';

export default {
  title: 'Atomic/Panel',
  component: Panel,
  argTypes: {
    content: { control: 'text' },
    variant: { control: 'radio', options: ['h1', 'body1', 'body2'] },
  },
} as ComponentMeta<typeof Panel>;

type TemplateArgs = {
  variant: string;
  content: string;
};

const Template: ComponentStory<React.FunctionComponent<TemplateArgs>> = ({
  children,
  variant,
  content,
  ...args
}) => (
  <Panel {...args}>
    <Typography variant={variant as TypographyProps['variant']}>{content}</Typography>
  </Panel>
);

export const Basic = Template.bind({});
Basic.args = {};
