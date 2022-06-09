import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider, Agents } from '@components/contexts';
import MintBurnForm from './MintBurnForm';
import { useMintBurnForm, useTokenApproval } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { MintBurnFormModes } from './types';

export default {
  title: 'Interface/MintBurnForm',
  component: MintBurnForm,
  argTypes: { 
    onSubmit: { action: 'clicked' } 
  },
} as ComponentMeta<typeof MintBurnForm>;

const mockAmm = ({
  hasEnoughUnderlyingTokens: () =>  true,
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
const NewPositionTemplate: ComponentStory<typeof MintBurnForm> = (args) => (
  <AgentProvider defaultAgent={Agents.LIQUIDITY_PROVIDER}>
    <NewPositionMintBurnForm {...args} />
  </AgentProvider>
);
const NewPositionMintBurnForm: React.FunctionComponent = (args) => {
  const balance = 100000;
  const mode = MintBurnFormModes.NEW_POSITION;
  const minRequiredMargin = 100;

  const form = useMintBurnForm(mockAmm, mode);

  return (
    <MintBurnForm 
      {...args} 
      balance={balance}
      errors={form.errors}
      formState={form.state}
      isFormValid={form.isValid}
      minRequiredMargin={minRequiredMargin}
      minRequiredMarginLoading={false}
      mode={mode}
      onCancel={() => alert('cancel')}
      onChangeFixedLow={form.setFixedLow}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
      submitButtonHint="Submit hint text here"
      submitButtonText="Submit"
      tokenApprovals={mockTokenApprovals}
    />
  );
};
export const NewPosition = NewPositionTemplate.bind({});
NewPosition.parameters = { controls: { exclude: /^on|is|formState*/ } };
NewPosition.args = {
  protocol: 'aGIL',
  fixedApr: 5,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};

// Editing the margin of a position
const EditingMarginTemplate: ComponentStory<typeof MintBurnForm> = (args) => (
  <AgentProvider defaultAgent={Agents.LIQUIDITY_PROVIDER}>
    <EditingMarginMintBurnForm {...args} />
  </AgentProvider>
);
const EditingMarginMintBurnForm: React.FunctionComponent = (args) => {
  const balance = 100000;
  const mode = MintBurnFormModes.EDIT_MARGIN;
  const minRequiredMargin = 100;

  const form = useMintBurnForm(mockAmm, mode, { fixedLow: 2, fixedHigh: 6 });

  return (
    <MintBurnForm 
      {...args} 
      balance={balance}
      errors={form.errors}
      formState={form.state} 
      isFormValid={form.isValid}
      minRequiredMargin={minRequiredMargin}
      minRequiredMarginLoading={false}
      mode={mode}
      onCancel={() => alert('cancel')}
      onChangeFixedLow={form.setFixedLow}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
      submitButtonHint="Submit hint text here"
      submitButtonText="Submit"
      tokenApprovals={mockTokenApprovals}
    />
  );
};
export const EditingMargin = EditingMarginTemplate.bind({});
EditingMargin.parameters = { controls: { exclude: /^on|is|formState*/ } };
EditingMargin.args = {
  protocol: 'aGIL',
  fixedApr: 5,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};

// Editing the liquidity of a position
const EditingLiquidityTemplate: ComponentStory<typeof MintBurnForm> = (args) => (
  <AgentProvider defaultAgent={Agents.LIQUIDITY_PROVIDER}>
    <EditingLiquidityMintBurnForm {...args} />
  </AgentProvider>
);
const EditingLiquidityMintBurnForm: React.FunctionComponent = (args) => {
  const balance = 100000;
  const mode = MintBurnFormModes.EDIT_LIQUIDITY;
  const minRequiredMargin = 100;

  const form = useMintBurnForm(mockAmm, mode, { fixedLow: 2, fixedHigh: 6 });

  return (
    <MintBurnForm 
      {...args} 
      balance={balance}
      errors={form.errors}
      formState={form.state} 
      isFormValid={form.isValid}
      minRequiredMargin={minRequiredMargin}
      minRequiredMarginLoading={false}
      mode={mode}
      onCancel={() => alert('cancel')}
      onChangeFixedLow={form.setFixedLow}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
      submitButtonHint="Submit hint text here"
      submitButtonText="Submit"
      tokenApprovals={mockTokenApprovals}
    />
  );
};
export const EditingLiquidity = EditingLiquidityTemplate.bind({});
EditingLiquidity.parameters = { controls: { exclude: /^on|is|formState*/ } };
EditingLiquidity.args = {
  protocol: 'aGIL',
  fixedApr: 5,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};