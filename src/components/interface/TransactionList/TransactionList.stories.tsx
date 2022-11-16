import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionList from './TransactionList';
import JSBI from 'jsbi';
import { BigNumber } from 'ethers';

import { Position } from '@voltz-protocol/v1-sdk';

export default {
  title: 'Interface/TransactionList',
  component: TransactionList,
  args: {},
} as ComponentMeta<typeof TransactionList>;

const Template: ComponentStory<typeof TransactionList> = (args) => <TransactionList {...args} />;

const descale = (num: BigNumber) => {
  const output = num.div(BigNumber.from('10').pow(16));
  return output.toNumber() / 100;
};

export const FixedPosition = Template.bind({});
FixedPosition.args = {
  position: {
    source: 'ME',
    positionType: 1,
    amm: {
      descale,
      underlyingToken: {
        name: 'GIL',
      },
    },
    swaps: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        desiredNotional: JSBI.BigInt(1053848420000000000000000),
        fixedTokenDeltaUnbalanced: JSBI.BigInt(3550000000000000000),
        cumulativeFeeIncurred: JSBI.BigInt(15340000000000000000),
        variableTokenDelta: JSBI.BigInt(-15340000000000000000),
      },
    ],
    marginUpdates: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1621574608),
        marginDelta: JSBI.BigInt(1293380000000000000000),
      },
    ],
    settlements: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(1053848420000000000000000),
      },
    ],
    liquidations: [
      {
        id: 4,
        transactionTimestamp: JSBI.BigInt(1611574608),
        notionalUnwound: JSBI.BigInt(1293380000000000000000),
        reward: JSBI.BigInt(-1293380000000000000000),
      },
    ],
  } as unknown as Position,
};

export const VariablePosition = Template.bind({});
VariablePosition.args = {
  position: {
    source: 'ME',
    positionType: 2,
    amm: {
      descale,
      underlyingToken: {
        name: 'GIL',
      },
    },
    swaps: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        desiredNotional: JSBI.BigInt(1053848420000000000000000),
        fixedTokenDeltaUnbalanced: JSBI.BigInt(3550000000000000000),
        cumulativeFeeIncurred: JSBI.BigInt(15340000000000000000),
        variableTokenDelta: JSBI.BigInt(15340000000000000000),
      },
    ],
    marginUpdates: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1621574608),
        marginDelta: JSBI.BigInt(1293380000000000000000),
      },
    ],
    settlements: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(1053848420000000000000000),
      },
    ],
    liquidations: [
      {
        id: 4,
        transactionTimestamp: JSBI.BigInt(1611574608),
        notionalUnwound: JSBI.BigInt(1293380000000000000000),
        reward: JSBI.BigInt(-1293380000000000000000),
      },
    ],
  } as unknown as Position,
};

export const LPPosition = Template.bind({});
LPPosition.args = {
  position: {
    source: 'ME',
    positionType: 3,
    amm: {
      descale,
      underlyingToken: {
        name: 'GIL',
      },
    },
    mints: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        amount: JSBI.BigInt(1053848420000000000000000),
      },
    ],
    burns: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1641574608),
        amount: JSBI.BigInt(1053848420000000000000000),
      },
    ],
    marginUpdates: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1621574608),
        marginDelta: JSBI.BigInt(1293380000000000000000),
      },
    ],
    settlements: [
      {
        id: 4,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(1053848420000000000000000),
      },
    ],
    liquidations: [
      {
        id: 5,
        transactionTimestamp: JSBI.BigInt(1611574608),
        notionalUnwound: JSBI.BigInt(1293380000000000000000),
        reward: JSBI.BigInt(-1293380000000000000000),
      },
    ],
  } as unknown as Position,
};
