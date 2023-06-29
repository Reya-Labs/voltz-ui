import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotionalSwap } from './index';

export default {
  title: 'Components/NotionalSwap',
  component: NotionalSwap,
  args: {},
} as ComponentMeta<typeof NotionalSwap>;

const Template: ComponentStory<typeof NotionalSwap> = (args) => {
  return <NotionalSwap />;
};

export const Default = Template.bind({});
