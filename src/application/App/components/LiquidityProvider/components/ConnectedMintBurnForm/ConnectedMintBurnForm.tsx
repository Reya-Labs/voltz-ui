import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import { AMMProvider } from '@components/contexts';
import {
  MintBurnForm,
  MintBurnFormProps,
  HandleSubmitMintBurnFormArgs,
  PendingTransaction,
} from '@components/interface';
import { updateFixedRate } from './utilities';
import { Position } from '@voltz/v1-sdk/dist/types/entities';
export type ConnectedMintBurnFormProps = {
  amm: AugmentedAMM;
  marginEditMode?: boolean;
  liquidityEditMode?: boolean;
  onReset: () => void;
  position?: Position;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({
  amm,
  onReset,
  marginEditMode,
  liquidityEditMode,
  position
}) => {
  const { agent } = useAgent();
  const navigate = useNavigate();
  const [fixedLow, setFixedLow] = useState<MintBurnFormProps['fixedLow']>();
  const handleSetFixedLow = useCallback(
    updateFixedRate({ amm, fixedRate: fixedLow, setFixedRate: setFixedLow }),
    [amm, fixedLow, setFixedLow],
  );

  const [addOrRemoveMargin, setAddOrRemoveMargin] =
  useState<MintBurnFormProps['addOrRemoveMargin']>();

  const [addOrBurnLiquidity, setAddOrBurnLiquidity] =
  useState<MintBurnFormProps['addOrBurnLiquidity']>();

  const [fixedHigh, setFixedHigh] = useState<MintBurnFormProps['fixedHigh']>();
  const handleSetFixedHigh = useCallback(
    updateFixedRate({ amm, fixedRate: fixedHigh, setFixedRate: setFixedHigh }),
    [amm, fixedHigh, setFixedHigh],
  );

  const [notional, setNotional] = useState<MintBurnFormProps['notional']>();
  const [margin, setMargin] = useState<MintBurnFormProps['margin']>();
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (args: HandleSubmitMintBurnFormArgs) => {
      const transaction = { ...args, ammId: amm.id, agent };
 
    if (marginEditMode) {
      const updatePositionMargin = actions.updatePositionMarginAction(amm, transaction);
      setTransactionId(updatePositionMargin.payload.transaction.id);
        // todo: if remove margin, change margin to -margin (delta)
      dispatch(updatePositionMargin);
    } else {
      // // eslint-disable-next-line
      // console.log('addOrBurnLiq', addOrBurnLiquidity)
      if (addOrBurnLiquidity || !liquidityEditMode) {
        // ADDING LIQUIDITY
        const mint = actions.mintAction(amm, transaction);
        setTransactionId(mint.payload.transaction.id);
        dispatch(mint);

      }  else {
        // BURN LIQUIDITY
        const updatePositionLiquidity = actions.burnAction(amm, transaction);
        setTransactionId(updatePositionLiquidity.payload.transaction.id);
        dispatch(updatePositionLiquidity);


      } 
    }  
      
    },
    [setTransactionId, dispatch, agent, amm.id, liquidityEditMode, marginEditMode, addOrBurnLiquidity],
  );
  const handleComplete = () => {
    onReset();
    navigate(`/${routes.LP_FARM}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  }

  if (!amm) {
    return null;
  }

  if (activeTransaction) {
    return (
      <PendingTransaction amm={amm} addOrBurnLiquidity={addOrBurnLiquidity} transactionId={transactionId} onComplete={handleComplete} onBack={handleGoBack} />
    );
  }

  // Debugging lines to check if toggle changes value of onAddOrBurnLiquidity: keep for debugging liquidity burning toggle
  // const handleBurnChange = (input: boolean) => {
  //   // eslint-disable-next-line
  //   console.log('Change to', input)
  //   setAddOrBurnLiquidity(input)
  // }

  return (
    <AMMProvider amm={amm}>
      <MintBurnForm
        protocol={amm.protocol}
        startDate={amm.startDateTime}
        endDate={amm.endDateTime}
        onChangeFixedLow={handleSetFixedLow}
        fixedLow={position ? parseFloat(position.fixedRateLower.toFixed() ) : fixedLow}
        fixedHigh={position ? parseFloat(position.fixedRateUpper.toFixed() ) : fixedHigh}
        onChangeFixedHigh={handleSetFixedHigh}
        notional={notional || 0}
        onChangeNotional={setNotional}
        margin={margin || 0}
        onChangeMargin={setMargin}
        onSubmit={handleSubmit}
        onCancel={onReset}
        marginEditMode={marginEditMode}
        liquidityEditMode={liquidityEditMode}
        onAddOrRemoveMargin={setAddOrRemoveMargin} 
        addOrRemoveMargin={addOrRemoveMargin} 
        onAddOrBurnLiquidity={setAddOrBurnLiquidity}
        addOrBurnLiquidity={addOrBurnLiquidity}
      />
    </AMMProvider>
  );
};

export default ConnectedMintBurnForm;
