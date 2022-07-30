import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectInput from './SelectInput';

export default {
  title: 'Atomic/SelectInput',
  component: SelectInput,
} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = (args) => <SelectInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    { label: '-1%', value: -1 },
    { label: '1%',  value: 1  },
    { label: '5%',  value: 5  },
    { label: '10%', value: 10 },
  ],
  size: 'small'
};
