import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AMM } from '@voltz-protocol/v1-sdk';
import { DateTime, Duration } from 'luxon';
import React from 'react';

import { AgentProvider } from '../../../contexts/AgentContext/AgentProvider';
import { Agents } from '../../../contexts/AgentContext/types';
import { AMMProvider } from '../../../contexts/AMMContext/AMMContext';
import {
  MintBurnFormHintStates,
  MintBurnFormModes,
  MintBurnFormProvider,
  MintBurnFormSubmitButtonStates,
  useMintBurnForm,
} from '../../../contexts/MintBurnFormContext/MintBurnFormContext';
import { useTokenApproval } from '../../../hooks/useTokenApproval';
import { MintBurnForm } from './MintBurnForm';

export default {
  title: 'Interface/MintBurnForm',
  component: MintBurnForm,
  argTypes: {
    onSubmit: { action: 'clicked' },
  },
} as ComponentMeta<typeof MintBurnForm>;

const mockAmm = {
  getCapPercentage: () => Promise.resolve(),
  getFixedApr: () => Promise.resolve(),
  getInstantApy: () => Promise.resolve(),
  isUnderlyingTokenApprovedForPeriphery: () => true,
  hasEnoughUnderlyingTokens: () => true,
  underlyingToken: {
    id: '0x123456789',
    name: 'gil',
  },
} as unknown as AMM;

const mockTokenApprovals = {
  approving: false,
  approveUnderlyingTokenForPeriphery: () => Promise.resolve(),
  checkingApprovals: false,
  underlyingTokenApprovedForPeriphery: true,
} as ReturnType<typeof useTokenApproval>;

// Creating a new position
const NewPositionTemplate: ComponentStory<typeof MintBurnForm> = (args) => (
  <AgentProvider defaultAgent={Agents.LIQUIDITY_PROVIDER}>
    <AMMProvider amm={mockAmm}>
      <MintBurnFormProvider mode={MintBurnFormModes.NEW_POSITION}>
        <NewPositionMintBurnForm {...args} />
      </MintBurnFormProvider>
    </AMMProvider>
  </AgentProvider>
);
const NewPositionMintBurnForm: React.FunctionComponent = (args) => {
  const balance = 100000;
  const form = useMintBurnForm();

  return (
    <MintBurnForm
      {...args}
      balance={balance}
      errors={form.errors}
      formState={form.state}
      hintState={MintBurnFormHintStates.READY_TO_TRADE}
      isFormValid={form.isValid}
      isTradeVierified={true}
      mode={form.mode}
      submitButtonState={MintBurnFormSubmitButtonStates.ADD_LIQUIDITY}
      tokenApprovals={mockTokenApprovals}
      onCancel={() => alert('cancel')}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeFixedLow={form.setFixedLow}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction}
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
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
    <AMMProvider amm={mockAmm}>
      <MintBurnFormProvider
        defaultValues={{ fixedLow: 2, fixedHigh: 6 }}
        mode={MintBurnFormModes.EDIT_MARGIN}
      >
        <EditingMarginMintBurnForm {...args} />
      </MintBurnFormProvider>
    </AMMProvider>
  </AgentProvider>
);
const EditingMarginMintBurnForm: React.FunctionComponent = (args) => {
  const balance = 100000;
  const form = useMintBurnForm();

  return (
    <MintBurnForm
      {...args}
      balance={balance}
      errors={form.errors}
      formState={form.state}
      hintState={MintBurnFormHintStates.READY_TO_TRADE}
      isFormValid={form.isValid}
      isTradeVierified={true}
      mode={form.mode}
      submitButtonState={MintBurnFormSubmitButtonStates.DEPOSIT_MARGIN}
      tokenApprovals={mockTokenApprovals}
      onCancel={() => alert('cancel')}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeFixedLow={form.setFixedLow}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction}
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
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
    <AMMProvider amm={mockAmm}>
      <MintBurnFormProvider
        defaultValues={{ fixedLow: 2, fixedHigh: 6 }}
        mode={MintBurnFormModes.EDIT_LIQUIDITY}
      >
        <EditingLiquidityMintBurnForm {...args} />
      </MintBurnFormProvider>
    </AMMProvider>
  </AgentProvider>
);
const EditingLiquidityMintBurnForm: React.FunctionComponent = (args) => {
  const balance = 100000;
  const form = useMintBurnForm();

  return (
    <MintBurnForm
      {...args}
      balance={balance}
      errors={form.errors}
      formState={form.state}
      hintState={MintBurnFormHintStates.READY_TO_TRADE}
      isFormValid={form.isValid}
      isTradeVierified={true}
      mode={form.mode}
      submitButtonState={MintBurnFormSubmitButtonStates.ADD_LIQUIDITY}
      tokenApprovals={mockTokenApprovals}
      onCancel={() => alert('cancel')}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeFixedLow={form.setFixedLow}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction}
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
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
