import React from 'react';
import Box from '@mui/material/Box';
import { MintSummary } from './components';
import { MintBurnFormLiquidityAction, MintBurnFormModes, MintBurnFormState } from '@contexts';
import { isUndefined } from 'lodash';
import { FormPanel } from '@components/interface';

export type MintBurnInfoProps = {
  balance?: number; 
  formState: MintBurnFormState;
  minRequiredMargin?: number;
  minRequiredMarginLoading: boolean;
  mode: MintBurnFormModes;
  underlyingTokenName?: string;
};

const MintBurnInfo: React.FunctionComponent<MintBurnInfoProps> = ({
  balance,
  formState,
  minRequiredMargin,
  minRequiredMarginLoading,
  mode = MintBurnFormModes.NEW_POSITION,
  underlyingTokenName = ''
}) => {
  const isAddingLiquidity = mode !== MintBurnFormModes.EDIT_LIQUIDITY || formState.liquidityAction === MintBurnFormLiquidityAction.ADD;

  return (
    <FormPanel noBackground>
      {(mode !== MintBurnFormModes.EDIT_MARGIN && isAddingLiquidity && (!isUndefined(minRequiredMargin) || minRequiredMarginLoading)) && (
        <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          <MintSummary 
            balance={balance}
            minRequiredMargin={minRequiredMargin}
            loading={minRequiredMarginLoading} 
            underlyingTokenName={underlyingTokenName} 
          />
        </Box>
      )}
    </FormPanel>
  );
};

export default MintBurnInfo;
