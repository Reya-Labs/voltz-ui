import React from 'react';

import { IconLabel } from '../../../components/composite/IconLabel/IconLabel';
import { ReactComponent as DAI } from './dai-icon.svg';
import { ReactComponent as ETH } from './eth-icon.svg';
import { ReactComponent as USDC } from './usdc-icon.svg';
import { ReactComponent as USDT } from './usdt-icon.svg';
import {
  TitleBox,
  TitleTypography,
  VaultApyTypography,
  VaultFieldBox,
  VaultMetricsBox,
} from './VaultField.styled';

const getTokenIcon = (token: string) => {
  switch (token) {
    case 'USDC': {
      return <USDC />;
    }
    case 'ETH': {
      return <ETH />;
    }
    case 'DAI': {
      return <DAI />;
    }
    case 'USDT': {
      return <USDT />;
    }
    default: {
      return <USDC />;
    }
  }
};

type VaultFieldProps = {
  title: string;
  token: string;
  expectedApys: [number, number][];
  weights: number[];
};

export const VaultField: React.FunctionComponent<VaultFieldProps> = ({
  title,
  token,
  expectedApys,
  weights,
}: VaultFieldProps) => {
  const apySum: [number, number] = [0, 0];

  for (let i = 0; i < expectedApys.length; i++) {
    apySum[0] += expectedApys[i][0] * weights[i];
    apySum[1] += expectedApys[i][1] * weights[i];
  }

  const averageApyFrom = apySum[0] / 100;
  const averageApyTo = apySum[1] / 100;

  return (
    <VaultFieldBox>
      <TitleBox>
        {getTokenIcon(token)}
        <TitleTypography>{title}</TitleTypography>
      </TitleBox>
      <VaultMetricsBox>
        <VaultApyTypography
          label={
            <IconLabel
              icon="information-circle"
              info="Estimated return of this strategy had it been running during the last quarter of 2022, depending on when the deposit was made."
              label="ESTIMATED APY RANGING FROM"
            />
          }
        >
          {Number(averageApyFrom.toFixed(2))}% to {Number(averageApyTo.toFixed(2))}%
        </VaultApyTypography>
      </VaultMetricsBox>
    </VaultFieldBox>
  );
};
