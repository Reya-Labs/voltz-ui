import React from 'react';
import Box from '@mui/material/Box';
import { MintSummary } from './components';
import { MintBurnFormLiquidityAction, MintBurnFormModes, MintBurnFormState } from '@contexts';
import { isUndefined } from 'lodash';

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
    <Box
      sx={{
        marginTop: 12,
        marginLeft: 8,
        width: (theme) => theme.spacing(97),

      }}
    >
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
    </Box>
  );
};

export default MintBurnInfo;
