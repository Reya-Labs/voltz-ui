import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useStateMemo } from '@hooks';
import PoolForm, { PoolFormProps } from './PoolForm';

export default {
  title: 'Interface/PoolForm',
  component: PoolForm,
  argTypes: { onSubmit: { action: 'clicked' } },
} as ComponentMeta<typeof PoolForm>;

type PoolFormWrapperProps = Omit<
  PoolFormProps,
  | 'onChangeAgent'
  | 'onChangeFixedLow'
  | 'onChangeFixedHigh'
  | 'onChangeLeverage'
  | 'onChangePartialCollateralization'
  | 'onChangeMargin'
>;

const PoolFormWrapper: React.FunctionComponent<PoolFormWrapperProps> = ({ ...props }) => {
  const [agent, setAgent] = useStateMemo<PoolFormProps['agent']>(props.agent);
  const [fixedLow, setFixedLow] = useStateMemo<PoolFormProps['fixedLow']>(props.fixedLow);
  const [fixedHigh, setFixedHigh] = useStateMemo<PoolFormProps['fixedHigh']>(props.fixedHigh);
  const [leverage, setLeverage] = useStateMemo<PoolFormProps['leverage']>(props.leverage);
  const [margin, setMargin] = useStateMemo<PoolFormProps['margin']>(props.margin);
  const [partialCollateralization, setPartialCollateralization] = useStateMemo<
    PoolFormProps['partialCollateralization']
  >(props.partialCollateralization);
  const handleSubmit = (args: Record<string, unknown>) => props.onSubmit(args);

  return (
    <PoolForm
      {...props}
      agent={agent}
      onChangeAgent={setAgent}
      fixedLow={fixedLow}
      fixedHigh={fixedHigh}
      leverage={leverage}
      margin={margin}
      partialCollateralization={partialCollateralization}
      onChangeFixedLow={setFixedLow}
      onChangeFixedHigh={setFixedHigh}
      onChangeLeverage={setLeverage}
      onChangeMargin={setMargin}
      onChangePartialCollateralization={setPartialCollateralization}
      onSubmit={handleSubmit}
    />
  );
};

const Template: ComponentStory<typeof PoolForm> = (args) => <PoolFormWrapper {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  protocol: 'aUSDC',
  fixedApr: 5,
  variableApr: 15,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};
