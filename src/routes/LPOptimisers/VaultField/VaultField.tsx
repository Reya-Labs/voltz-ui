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
  expectedApys: number[];
  weights: number[];
};

export const VaultField: React.FunctionComponent<VaultFieldProps> = ({
  title,
  token,
  expectedApys,
  weights,
}: VaultFieldProps) => {
  let apySum = 0;
  let weightSum = 0;

  for (let i = 0; i < expectedApys.length; i++) {
    apySum += expectedApys[i] * weights[i];
    weightSum += weights[i];
  }

  const averageApy = weightSum > 0 ? apySum / weightSum : 0;

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
              info="This shows the estimated returns that would have been generated had the strategy been running from Jul 22 to Oct 22."
              label="Estimated Historic APY"
            />
          }
        >
          {averageApy > 30 ? '>30' : averageApy.toFixed(2)}%
        </VaultApyTypography>
      </VaultMetricsBox>
    </VaultFieldBox>
  );
};
