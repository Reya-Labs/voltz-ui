import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
import { IconLabel, ToggleButtonGroup } from '@components/composite';

export type BurnControlsProps = {
  defaultBurnLiquidity?: boolean;
  burnLiquidity?: boolean;
  onAddOrBurnLiquidity: (value: boolean) => void;
};

const BurnControls: React.FunctionComponent<BurnControlsProps> = ({
  defaultBurnLiquidity,
  burnLiquidity,
  onAddOrBurnLiquidity,
}) => {
  useEffect(() => {
    if (isUndefined(burnLiquidityValue)) {
      onAddOrBurnLiquidity(false);
    }
  }, []);

  
  const burnLiquidityValue = isUndefined(burnLiquidity)
    ? defaultBurnLiquidity
    : burnLiquidity;

  const titles = {
    ADD: 'add',
    BURN: 'burn',
  };

  const handleChangeBurnLiquidity = (option: string) => {
    onAddOrBurnLiquidity(option === titles.ADD);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: (theme) => theme.spacing(4),
        '& > *:REMOVEt(:last-child)': { marginBottom: (theme) => theme.spacing(4) },
      }}
    >

            
      <ToggleButtonGroup
        label={
          <IconLabel label="Add or Burn Liquidity" icon="information-circle" info="" removeIcon />
        }
        options={Object.values(titles)}
        option={
            burnLiquidityValue
            ? titles.ADD
            : titles.BURN
        }
        defaultOption={titles.ADD}
        onChangeOption={handleChangeBurnLiquidity}
        // agent={agent}
      />

    </Box>
  );
};

export default BurnControls;