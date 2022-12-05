import Box from '@mui/material/Box';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import {
  MintBurnFormLiquidityAction,
  MintBurnFormModes,
  MintBurnFormState,
} from '../../../contexts/MintBurnFormContext/MintBurnFormContext';
import { FormPanel } from '../FormPanel/FormPanel';
import { MintSummary } from './components';

export type MintBurnInfoProps = {
  balance?: number;
  formState: MintBurnFormState;
  mintMinimumMarginRequirement?: number;
  mintMinimumMarginRequirementLoading: boolean;
  mode: MintBurnFormModes;
  underlyingTokenName?: string;
};

export const MintBurnInfo: React.FunctionComponent<MintBurnInfoProps> = ({
  balance,
  formState,
  mintMinimumMarginRequirement,
  mintMinimumMarginRequirementLoading,
  mode = MintBurnFormModes.NEW_POSITION,
  underlyingTokenName = '',
}) => {
  const isAddingLiquidity =
    mode !== MintBurnFormModes.EDIT_LIQUIDITY ||
    formState.liquidityAction === MintBurnFormLiquidityAction.ADD;

  return (
    <FormPanel noBackground>
      {mode !== MintBurnFormModes.EDIT_MARGIN &&
        isAddingLiquidity &&
        (!isUndefined(mintMinimumMarginRequirement) || mintMinimumMarginRequirementLoading) && (
          <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
            <MintSummary
              balance={balance}
              loading={mintMinimumMarginRequirementLoading}
              mintMinimumMarginRequirement={mintMinimumMarginRequirement}
              underlyingTokenName={underlyingTokenName}
            />
          </Box>
        )}
    </FormPanel>
  );
};
