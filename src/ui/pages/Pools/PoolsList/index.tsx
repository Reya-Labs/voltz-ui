import React from 'react';

import { PoolEntry } from './PoolEntry';
import { PoolsHeader } from './PoolsHeader';
import { PoolsHeaderAndListBox, PoolsListBox } from './PoolsList.styled';

const aMMs: {
  market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
  isBorrowing: boolean;
  isAaveV3: boolean;
  fixedRateFormatted: string;
  aMMMaturity: string;
  id: string;
  variableRate24hDelta: number;
  variableRateFormatted: string;
}[] = [
  {
    market: 'Aave',
    token: 'eth',
    isBorrowing: true,
    isAaveV3: false,
    fixedRateFormatted: '235.00',
    aMMMaturity: '10/04/23',
    id: 'aave-eth-borrow',
    variableRate24hDelta: -0.25,
    variableRateFormatted: '12.25',
  },
  {
    market: 'Compound',
    token: 'usdc',
    isBorrowing: false,
    isAaveV3: true,
    fixedRateFormatted: '311.50',
    aMMMaturity: '12/31/23',
    id: 'compound-usdc-lend',
    variableRate24hDelta: 123.12,
    variableRateFormatted: '23.50',
  },
  {
    market: 'Aave',
    token: 'eth',
    isBorrowing: true,
    isAaveV3: false,
    fixedRateFormatted: '5555.00',
    aMMMaturity: '10/04/23',
    id: 'aave-eth-borrow',
    variableRate24hDelta: -122.25,
    variableRateFormatted: '222.25',
  },
  {
    market: 'Compound',
    token: 'usdc',
    isBorrowing: false,
    isAaveV3: true,
    fixedRateFormatted: '3.50',
    aMMMaturity: '12/31/23',
    id: 'compound-usdc-lend',
    variableRate24hDelta: 0.1,
    variableRateFormatted: '2.50',
  },
  {
    market: 'Lido',
    token: 'eth',
    isBorrowing: true,
    isAaveV3: false,
    fixedRateFormatted: '6.50',
    aMMMaturity: '06/15/23',
    id: 'lido-eth-borrow',
    variableRate24hDelta: 0.5,
    variableRateFormatted: '1.75',
  },
  {
    market: 'Rocket',
    token: 'dai',
    isBorrowing: true,
    isAaveV3: true,
    fixedRateFormatted: '2.75',
    aMMMaturity: '11/30/23',
    id: 'rocket-dai-borrow',
    variableRate24hDelta: -0.2,
    variableRateFormatted: '3.25',
  },
  {
    market: 'Aave',
    token: 'usdt',
    isBorrowing: false,
    isAaveV3: false,
    fixedRateFormatted: '4.00',
    aMMMaturity: '09/30/23',
    id: 'aave-usdt-lend',
    variableRate24hDelta: 0.0,
    variableRateFormatted: '2.00',
  },
  {
    market: 'Lido',
    token: 'usdt',
    isBorrowing: true,
    isAaveV3: true,
    fixedRateFormatted: '7.00',
    aMMMaturity: '03/31/2024',
    id: 'lido-usdt-borrow',
    variableRate24hDelta: -0.1,
    variableRateFormatted: '1.50',
  },
];

export const PoolsList: React.FunctionComponent = () => {
  return (
    <PoolsHeaderAndListBox>
      <PoolsHeader />
      <PoolsListBox>
        {aMMs.map((aMM, index) => (
          <PoolEntry
            key={aMM.id}
            aMMMaturity={aMM.aMMMaturity}
            backgroundColorToken={index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8'}
            fixedRateFormatted={aMM.fixedRateFormatted}
            isAaveV3={aMM.isAaveV3}
            isBorrowing={aMM.isBorrowing}
            market={aMM.market}
            token={aMM.token}
            variableRate24hDelta={aMM.variableRate24hDelta}
            variableRateFormatted={aMM.variableRateFormatted}
          />
        ))}
      </PoolsListBox>
    </PoolsHeaderAndListBox>
  );
};
