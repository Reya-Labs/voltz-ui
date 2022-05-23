import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@components/contexts';
import SwapForm from './SwapForm';
import { useSwapForm, useTokenApproval } from '@hooks';
import { AugmentedAMM } from '@utilities';

export default {
  title: 'Interface/SwapForm',
  component: SwapForm,
  argTypes: { 
    onSubmit: { action: 'clicked' } 
  },
} as ComponentMeta<typeof SwapForm>;

const mockAmm = ({
  underlyingToken: {
    id: '0x123456789',
    name: 'gil'
  }
} as unknown) as AugmentedAMM;

const mockTokenApprovals = {
  approving: false,
  approveFCM: () => Promise.resolve(),
  approveUnderlyingTokenForFCM: () => Promise.resolve(),
  approveUnderlyingTokenForPeriphery: () => Promise.resolve(),
  approveYieldBearingTokenForFCM: () => Promise.resolve(),
  checkingApprovals: false,
  FCMApproved: true,
  underlyingTokenApprovedForFCM: true,
  underlyingTokenApprovedForPeriphery: true,
  yieldBearingTokenApprovedForFCM: true
} as ReturnType<typeof useTokenApproval>


// Creating a new position
const NewPositionTemplate: ComponentStory<typeof SwapForm> = (args) => (
  <AgentProvider>
    <NewPositionSwapForm {...args} />
  </AgentProvider>
);
const NewPositionSwapForm: React.FunctionComponent = (args) => {
  const isEditingMargin = false;
  const form = useSwapForm(mockAmm, isEditingMargin);

  return (
    <SwapForm 
      {...args} 
      errors={form.errors}
      formState={form.state} 
      isEditingMargin={isEditingMargin}
      isFormValid={form.isValid}
      onCancel={() => alert('cancel')}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={() => form.validate()}
      submitButtonText="Submit"
      tokenApprovals={mockTokenApprovals}
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
  const isEditingMargin = true;
  const form = useSwapForm(mockAmm, isEditingMargin);

  return (
    <SwapForm 
      {...args} 
      errors={form.errors}
      formState={form.state}
      isEditingMargin={isEditingMargin}
      isFormValid={form.isValid}
      onCancel={() => alert('cancel')}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={() => form.validate()}
      submitButtonText="Submit"
      tokenApprovals={mockTokenApprovals}
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