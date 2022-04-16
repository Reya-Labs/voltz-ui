import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
import { useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import { Button, Panel } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  NotionalAmount,
  MarginAmount,
} from '@components/composite';
import { HandleSubmitSwapFormArgs } from './types';
import { TraderControls, MarginControls, SwapInfo, SubmitSwapFormButton } from './components';

export type SwapFormProps = {
  isModifying?: boolean;
  protocol?: string;
  underlyingTokenName?: string;
  fixedApr?: number;
  startDate?: DateTime;
  endDate?: DateTime;
  defaultNotional?: number;
  defaultMargin?: number;
  defaultPartialCollateralization?: boolean;
  defaultAddOrRemoveMargin?: boolean;
  maxMargin?: number;
  notional?: number;
  margin?: number;
  partialCollateralization?: boolean;
  addOrRemoveMargin?: boolean;
  marginEditMode?: boolean;
  onChangeNotional: (value: number) => void;
  onChangePartialCollateralization: (value: boolean) => void;
  onAddOrRemoveMargin: (value: boolean) => void;
  onChangeMargin: (value: number) => void;
  onSubmit: (values: HandleSubmitSwapFormArgs) => void;
  onCancel: () => void;
};

const SwapForm: React.FunctionComponent<SwapFormProps> = ({
  isModifying = false,
  protocol,
  underlyingTokenName,
  startDate,
  endDate,
  defaultNotional,
  defaultMargin,
  defaultPartialCollateralization,
  defaultAddOrRemoveMargin,
  maxMargin,
  notional,
  margin,
  partialCollateralization,
  addOrRemoveMargin,
  marginEditMode
  ,
  onChangeNotional,
  onChangePartialCollateralization,
  onAddOrRemoveMargin,
  onChangeMargin,
  onSubmit,
  onCancel,
}) => {
  
  const handleSubmit = () => {

    if (isUndefined(notional) || isUndefined(margin) || isUndefined(partialCollateralization) ) {
      return;
    }

    if (isNaN(notional) || isNaN(margin)) {
      return;
    }

    return onSubmit({
      notional,
      margin,
      partialCollateralization,
    });
  };

  const handleSubmitMarginOnly = () => {

    if (isUndefined(margin) || isNaN(margin) ) {
      return;
    }

    const marginDelta = margin;

    // todo: it would be more elegant to have a different onSubmit for position margin updates since in this case notional and partial collateralization
    // are redundunt inputs
    return onSubmit({
      notional: 0,
      margin: marginDelta,
      partialCollateralization: false,
    });
  };

  const { agent } = useAgent();

  let _boxShadow = '0px 0px 88px rgba(38, 103, 255, 0.20)';

  if (agent === Agents.FIXED_TRADER) {
    _boxShadow = '0px 0px 88px rgba(0, 131, 155, 0.2)';
  }

  return (
    <Panel
      variant="main"
      sx={{
        marginTop: 12,
        padding: 6,
        width: (theme) => theme.spacing(85),
        boxShadow: _boxShadow,
        backgroundColor: "secondary.darken045",
        borderRadius: 2
      }}
    >
      <ProtocolInformation protocol={protocol}/>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
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
          marginEditMode && (
            <Box
            sx={{
              marginBottom: (theme) => theme.spacing(4),
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

        {
          !marginEditMode && (
            <Box
            sx={{
              marginBottom: (theme) => theme.spacing(4),
              display: 'flex',
            }}
          >
            <TraderControls
            isModifying={isModifying}
            defaultPartialCollateralization={defaultPartialCollateralization}
            partialCollateralization={partialCollateralization}
            onChangePartialCollateralization={onChangePartialCollateralization}
          />
            </Box>
          )
        }

      {
        !marginEditMode && (
          <Box
          sx={{
            marginBottom: (theme) => theme.spacing(4),
          }}
        >
          <NotionalAmount
            label="notional amount"
            info="Choose the notional you wish to trade. The notional amount is the total size of your trade."
            protocol={protocol}
            defaultNotional={defaultNotional}
            notional={notional}
            onChangeNotional={onChangeNotional}
          />
        </Box>
        )
      }

      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
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
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <SwapInfo notional={notional} underlyingTokenName={underlyingTokenName} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <SubmitSwapFormButton onSubmit={ marginEditMode ? handleSubmitMarginOnly : handleSubmit} />
        <Button
          sx={{ marginLeft: (theme) => theme.spacing(4) }}
          variant="darker"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Panel>
  );
};

export default SwapForm;
