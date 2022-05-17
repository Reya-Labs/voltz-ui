import React, { useState } from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@components/contexts';
import MintBurnForm, { MintBurnFormProps } from './MintBurnForm';
import { useMintBurnForm } from '@hooks';

export default {
  title: 'Interface/MintBurnForm',
  component: MintBurnForm,
  argTypes: { 
    onSubmit: { action: 'clicked' } 
  },
} as ComponentMeta<typeof MintBurnForm>;

// type MintBurnFormWrapperProps = Omit<
//   MintBurnFormProps,
//   'onChangeAgent' | 'onChangeFixedLow' | 'onChangeFixedHigh' | 'onChangeNotional' | 'onChangeMargin'
// >;

// const MintBurnFormWrapper: React.FunctionComponent<MintBurnFormWrapperProps> = ({ ...props }) => {
//   const form = useMintBurnForm({
//     fixedLow: props.fixedLow,
//     fixedHigh: props.fixedHigh,
//     notional: props.notional,
//     margin: props.margin,
//   })

//   return (
//     <AgentProvider>
//       <MintBurnForm
//         {...props}
//         fixedLow={fixedLow}
//         fixedHigh={fixedHigh}
//         notional={notional}
//         margin={margin}
//         onChangeFixedLow={setFixedLow}
//         onChangeFixedHigh={setFixedHigh}
//         onChangeNotional={setNotional}
//         onChangeMargin={setMargin}
//       />
//     </AgentProvider>
//   );
// };

// const Template: ComponentStory<typeof MintBurnForm> = (args) => <MintBurnFormWrapper {...args} />;

// export const Basic = Template.bind({});
// Basic.args = {
//   protocol: 'aUSDC',
//   fixedApr: 5,
//   startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
//   endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
// };

// Creating a new position
const NewPositionTemplate: ComponentStory<typeof MintBurnForm> = (args) => {
  const form = useMintBurnForm();
  return (
    <MintBurnForm 
      {...args} 
      formState={form.state} 
      onCancel={() => alert('cancel')}
      onChangeFixedLow={form.setFixedLow}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onSubmit={() => alert('submit')}
    />
  );
};
export const NewPosition = NewPositionTemplate.bind({});
NewPosition.parameters = { controls: { exclude: /^on|is|formState*/ } };
NewPosition.args = {
  protocol: 'aUSDC',
  fixedApr: 5,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};

// Editing the margin of a position
const EditingMarginTemplate: ComponentStory<typeof MintBurnForm> = (args) => {
  const form = useMintBurnForm({ fixedLow: 2, fixedHigh: 6 });
  return (
    <MintBurnForm 
      {...args} 
      formState={form.state} 
      onCancel={() => alert('cancel')}
      onChangeFixedLow={form.setFixedLow}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onSubmit={() => alert('submit')}
    />
  );
};
export const EditingMargin = EditingMarginTemplate.bind({});
EditingMargin.parameters = { controls: { exclude: /^on|is|formState*/ } };
EditingMargin.args = {
  protocol: 'aUSDC',
  fixedApr: 5,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
  isEditingMargin: true
};

// Editing the liquidity of a position
const EditingLiquidityTemplate: ComponentStory<typeof MintBurnForm> = (args) => {
  const form = useMintBurnForm({ fixedLow: 2, fixedHigh: 6 });
  return (
    <MintBurnForm 
      {...args} 
      formState={form.state} 
      onCancel={() => alert('cancel')}
      onChangeFixedLow={form.setFixedLow}
      onChangeFixedHigh={form.setFixedHigh}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onSubmit={() => alert('submit')}
    />
  );
};
export const EditingLiquidity = EditingLiquidityTemplate.bind({});
EditingLiquidity.parameters = { controls: { exclude: /^on|is|formState*/ } };
EditingLiquidity.args = {
  protocol: 'aUSDC',
  fixedApr: 5,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
  isEditingLiquidity: true
};

// protocol?: string;
// fixedApr?: number;
// startDate?: DateTime;
// endDate?: DateTime;
// maxMargin?: number;
// isEditingMargin?: boolean;
// isEditingLiquidity?: boolean;
// formState: MintBurnFormState;
// onChangeFixedLow: (value: number, increment: boolean | null) => void;
// onChangeFixedHigh: (value: number, increment: boolean | null) => void;
// onChangeNotional: (value: number) => void;
// onChangeMargin: (value: number) => void;
// onSubmit: () => void;
// onCancel: () => void;
// onChangeMarginAction: (value: MintBurnFormMarginAction) => void;
// onChangeLiquidityAction: (value: MintBurnFormLiquidityAction) => void;