import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionList from './TransactionList';
import { Position } from '@voltz-protocol/v1-sdk';
import JSBI from 'jsbi';

export default {
  title: 'Interface/TransactionList',
  component: TransactionList,
  args: {
    data: [],
  },
} as ComponentMeta<typeof TransactionList>;

const Template: ComponentStory<typeof TransactionList> = (args) => (
  <TransactionList {...args} />
);

export const FixedPosition = Template.bind({});
FixedPosition.args = {
  position: {
    source: 'ME',
    positionType: 1,
    amm: {
      underlyingToken: {
        name: 'GIL'
      }
    },
    swaps: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        desiredNotional: JSBI.BigInt(1053848420000000000000000),
        fixedTokenDelta: JSBI.BigInt(3550000000000000000),
        cumulativeFeeIncurred: JSBI.BigInt(15340000000000000000),
        variableTokenDelta: JSBI.BigInt(-15340000000000000000),
      }
    ],
    marginUpdates: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1621574608),
        marginDelta: JSBI.BigInt(1293380000000000000000),
      }
    ],
    settlements: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(1053848420000000000000000),
      }
    ],
    liquidations: [
      {
        id: 4,
        transactionTimestamp: JSBI.BigInt(1611574608),
        notionalUnwound: JSBI.BigInt(1293380000000000000000),
        reward: JSBI.BigInt(-1293380000000000000000),
      }
    ]
  } as unknown as Position,
};

export const VariablePosition = Template.bind({});
VariablePosition.args = {
  position: {
    source: 'ME',
    positionType: 2,
    amm: {
      underlyingToken: {
        name: 'GIL'
      }
    },
    swaps: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        desiredNotional: JSBI.BigInt(1053848420000000000000000),
        fixedTokenDelta: JSBI.BigInt(3550000000000000000),
        cumulativeFeeIncurred: JSBI.BigInt(15340000000000000000),
        variableTokenDelta: JSBI.BigInt(15340000000000000000),
      }
    ],
    marginUpdates: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1621574608),
        marginDelta: JSBI.BigInt(1293380000000000000000),
      }
    ],
    settlements: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(1053848420000000000000000),
      }
    ],
    liquidations: [
      {
        id: 4,
        transactionTimestamp: JSBI.BigInt(1611574608),
        notionalUnwound: JSBI.BigInt(1293380000000000000000),
        reward: JSBI.BigInt(-1293380000000000000000),
      }
    ]
  } as unknown as Position,
};

export const FCMPosition = Template.bind({});
FCMPosition.args = {
  position: {
    source: 'FCM',
    amm: {
      underlyingToken: {
        name: 'GIL'
      }
    },
    fcmSwaps: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        desiredNotional: JSBI.BigInt(1053848420000000000000000),
        fixedTokenDelta: JSBI.BigInt(3550000000000000000),
        cumulativeFeeIncurred: JSBI.BigInt(15340000000000000000),
      }
    ],
    fcmUnwinds: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1621574608),
        desiredNotional: JSBI.BigInt(1053848420000000000000000),
        fixedTokenDelta: JSBI.BigInt(3550000000000000000),
        cumulativeFeeIncurred: JSBI.BigInt(15340000000000000000),
      }
    ],
    fcmSettlements: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(1053848420000000000000000),
      }
    ]
  } as unknown as Position,
};

export const LPPosition = Template.bind({});
LPPosition.args = {
  position: {
    source: 'ME',
    positionType: 3,
    amm: {
      underlyingToken: {
        name: 'GIL'
      }
    },
    mints: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        amount: JSBI.BigInt(1053848420000000000000000),
      }
    ],
    burns: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1641574608),
        amount: JSBI.BigInt(1053848420000000000000000),
      }
    ],
    marginUpdates: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1621574608),
        marginDelta: JSBI.BigInt(1293380000000000000000),
      }
    ],
    settlements: [
      {
        id: 4,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(1053848420000000000000000),
      }
    ],
    liquidations: [
      {
        id: 5,
        transactionTimestamp: JSBI.BigInt(1611574608),
        notionalUnwound: JSBI.BigInt(1293380000000000000000),
        reward: JSBI.BigInt(-1293380000000000000000),
      }
    ]
  } as unknown as Position,
};