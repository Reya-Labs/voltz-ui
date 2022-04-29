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
  fcmMode?: boolean;
  addOrRemoveMargin?: boolean;
  marginEditMode?: boolean;
  onChangeNotional: (value: number) => void;
  onChangePartialCollateralization: (value: boolean) => void;
  onChangeFcmMode: (value: boolean) => void;
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
  fcmMode,
  addOrRemoveMargin,
  marginEditMode
  ,
  onChangeNotional,
  onChangePartialCollateralization,
  onChangeFcmMode,
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

    let marginDelta = Math.abs(margin);

    if (!addOrRemoveMargin) {
      marginDelta *= -1.0;
    }

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
      variant="dark"
      sx={{
        marginTop: 12,
        width: (theme) => theme.spacing(97),
        boxShadow: _boxShadow,
      }}
    >
      <ProtocolInformation protocol={protocol}/>
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

        {
          !marginEditMode && (
            <Box
            sx={{
              marginBottom: (theme) => theme.spacing(6),
              display: 'flex',
            }}
          >
            <TraderControls
            isModifying={isModifying}
            defaultPartialCollateralization={defaultPartialCollateralization}
            partialCollateralization={partialCollateralization}
            fcmMode={fcmMode}
            onChangePartialCollateralization={onChangePartialCollateralization}
            onChangeFcmMode={onChangeFcmMode}
          />
            </Box>
          )
        }

      {
        !marginEditMode &&  (
          <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
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

      {
      partialCollateralization && (
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

      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <SwapInfo notional={notional} underlyingTokenName={underlyingTokenName} />
      </Box>

      {
      partialCollateralization && (  
      <Box sx={{ display: 'flex' }}>
        <SubmitSwapFormButton onSubmit={ marginEditMode ? handleSubmitMarginOnly : handleSubmit} marginEditMode={marginEditMode} />
        <Button
          sx={{ marginLeft: (theme) => theme.spacing(4) }}
          variant="darker"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
      )}

      {
      !partialCollateralization && (  
      <Box sx={{ display: 'flex' }}>
      <SubmitSwapFormButton onSubmit={handleSubmit} />
      <Button
        sx={{ marginLeft: (theme) => theme.spacing(4) }}
        variant="darker"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Box>
      )};
  
    </Panel>
  );
};

export default SwapForm;
