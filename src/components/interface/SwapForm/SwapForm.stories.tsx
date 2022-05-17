import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider, Agents } from '@components/contexts';
import SwapForm from './SwapForm';
import { useSwapForm } from '@hooks';

export default {
  title: 'Interface/SwapForm',
  component: SwapForm,
  argTypes: { 
    onSubmit: { action: 'clicked' } 
  },
} as ComponentMeta<typeof SwapForm>;

// Creating a new position
const NewPositionTemplate: ComponentStory<typeof SwapForm> = (args) => (
  <AgentProvider>
    <NewPositionSwapForm {...args} />
  </AgentProvider>
);
const NewPositionSwapForm: React.FunctionComponent = (args) => {
  const form = useSwapForm();

  return (
    <SwapForm 
      {...args} 
      formState={form.state} 
      onCancel={() => alert('cancel')}
      onChangeFcmMode={form.setFcmMode}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={() => alert('submit')}
    />
  );
};
export const NewPosition = NewPositionTemplate.bind({});
NewPosition.parameters = { controls: { exclude: /^on|is|formState*/ } };
NewPosition.args = {
  protocol: 'aGIL',
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};

// // Editing the margin of a position
const EditingMarginTemplate: ComponentStory<typeof SwapForm> = (args) => (
  <AgentProvider>
    <EditingMarginSwapForm {...args} />
  </AgentProvider>
);
const EditingMarginSwapForm: React.FunctionComponent = (args) => {
  const form = useSwapForm();

  return (
    <SwapForm 
      {...args} 
      formState={form.state}
      isEditingMargin 
      onCancel={() => alert('cancel')}
      onChangeFcmMode={form.setFcmMode}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={() => alert('submit')}
    />
  );
};
export const EditingMargin = EditingMarginTemplate.bind({});
EditingMargin.parameters = { controls: { exclude: /^on|is|formState*/ } };
EditingMargin.args = {
  protocol: 'aGIL',
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};