import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';

import { AgentProps } from '@components/contexts';
import { Button, Panel } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  RateOptions,
  MarginAmount,
  NotionalAmount,
} from '@components/composite';
import { HandleSubmitMintBurnFormArgs } from './types';
import { MintBurnMinimumMarginAmount, SubmitMintBurnFormButton, BurnControls } from './components';
import { MarginControls } from '../SwapForm/components';

export type MintBurnFormProps = AgentProps & {
  protocol?: string;
  fixedApr?: number;
  startDate?: DateTime;
  endDate?: DateTime;
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  defaultNotional?: number;
  defaultMargin?: number;
  maxMargin?: number;
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
  margin?: number;
  marginEditMode?: boolean;
  liquidityEditMode?: boolean;
  defaultAddOrRemoveMargin?: boolean;
  defaultAddOrBurnLiquidity?: boolean;
  addOrRemoveMargin?: boolean;
  addOrBurnLiquidity?: boolean;
  position?: number;

  onChangeFixedLow: (value: number, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number, increment: boolean | null) => void;
  onChangeNotional: (value: number) => void;
  onChangeMargin: (value: number) => void;
  onSubmit: (values: HandleSubmitMintBurnFormArgs) => void;
  onCancel: () => void;
  onAddOrRemoveMargin: (value: boolean) => void;
  onAddOrBurnLiquidity: (value: boolean) => void;
};

const MintBurnForm: React.FunctionComponent<MintBurnFormProps> = ({
  protocol,
  startDate,
  endDate,
  defaultFixedLow,
  defaultFixedHigh,
  defaultNotional,
  defaultMargin,
  maxMargin,
  fixedLow,
  fixedHigh,
  notional,
  margin,
  marginEditMode,
  liquidityEditMode,
  defaultAddOrRemoveMargin,
  defaultAddOrBurnLiquidity,
  addOrRemoveMargin,
  addOrBurnLiquidity,
  position
  ,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeNotional,
  onChangeMargin,
  onSubmit,
  onCancel,
  onAddOrRemoveMargin,
  onAddOrBurnLiquidity,
}) => {
  const handleSubmit = () => {
    if (
      isUndefined(fixedLow) ||
      isUndefined(fixedHigh) ||
      isUndefined(notional) ||
      isUndefined(margin)
    ) {
      return;
    }

    return onSubmit({
      fixedLow,
      fixedHigh,
      notional,
      margin,
    });
  };


  const handleSubmitLiquidityOnly = () => {

    if (isUndefined(notional) || isNaN(notional) ) {
      return;
    }

  let burntNotional = Math.abs(notional);

  if (!addOrBurnLiquidity) {
    burntNotional *= -1.0;
  }

  return onSubmit({
    fixedLow: fixedLow!,   
    fixedHigh: fixedHigh!, 
    notional: burntNotional,
    margin: margin || 0,
  });

  };


  const handleSubmitMarginOnly = () => {

    if (isUndefined(margin) || isNaN(margin) ) {
      return;
    }

    let marginDelta = Math.abs(margin);

    if (!addOrRemoveMargin) {
      marginDelta *= -1.0;
    }

    return onSubmit({
      fixedLow: fixedLow!,   
      fixedHigh: fixedHigh!, 
      notional: notional!,
      margin: marginDelta,
    });
  };

  return (
    <Panel
      variant="darker"
      sx={{
        marginTop: 12,
        width: (theme) => theme.spacing(97),
        boxShadow: '0px 0px 60px rgba(255, 89, 156, 0.2)',
      }}
    >
      <ProtocolInformation protocol={protocol} />
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <MaturityInformation
          label={
            <IconLabel
              label="maturity"
              icon="information-circle"
              info="The proportion between the time elapsed since the initiation of the pool and the entire duration."
              removeIcon
            />
          }
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
      
      {

        liquidityEditMode && (
          <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
            display: 'flex',
          }}
        >
          <BurnControls 
            defaultBurnLiquidity={defaultAddOrBurnLiquidity}
            burnLiquidity={addOrBurnLiquidity} // Here burnLiquidity should really be called addLiquidity
            onAddOrBurnLiquidity={onAddOrBurnLiquidity}
          >
          </BurnControls>
          
          </Box>
        )
      }    



      {
          marginEditMode && (
            <Box
            sx={{
              marginBottom: (theme) => theme.spacing(6),
              display: 'flex',
            }}
          >
            <MarginControls 
              defaultAddMargin={defaultAddOrRemoveMargin}
              addMargin={addOrRemoveMargin}
              onAddOrRemoveMargin={onAddOrRemoveMargin}
            >
            </MarginControls>
            
            </Box>
          )
        }  

      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
          display: 'flex',
        }}
      >
        <RateOptions
          defaultFixedLow={defaultFixedLow}
          defaultFixedHigh={defaultFixedHigh}
          fixedLow={fixedLow}
          fixedHigh={fixedHigh}
          onChangeFixedLow={onChangeFixedLow}
          onChangeFixedHigh={onChangeFixedHigh}
        />
      </Box>
      
    {
        !marginEditMode && (

      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <NotionalAmount
          label={ (!liquidityEditMode || addOrBurnLiquidity) ? "provided liquidty" : "removed liquidity"} 
          info="Choose the notional amount of liquidity you wish to provide."
          protocol={protocol}
          defaultNotional={defaultNotional}
          notional={notional}
          onChangeNotional={onChangeNotional}
        />
      </Box>
          )
        }

      {
       (!marginEditMode && !liquidityEditMode || addOrBurnLiquidity ) && ( 
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <MintBurnMinimumMarginAmount
          fixedLow={fixedLow}
          fixedHigh={fixedHigh}
          notional={notional}
        />
      </Box>
       )
      }

      {
        (!liquidityEditMode || addOrBurnLiquidity) && ( 
          <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <MarginAmount
          protocol={protocol}
          defaultMargin={defaultMargin}
          maxMargin={maxMargin}
          margin={margin}
          isAdditional={addOrRemoveMargin}
          onChangeMargin={onChangeMargin}
        />
      </Box>
        )
      }

      <Box sx={{ display: 'flex' }}>
        <SubmitMintBurnFormButton onSubmit={marginEditMode ? handleSubmitMarginOnly : (liquidityEditMode ? handleSubmitLiquidityOnly : handleSubmit) } /> 
        <Button
          sx={{ marginLeft: (theme) => theme.spacing(6) }}
          variant="darker"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Panel>
  );
};

export default MintBurnForm;
