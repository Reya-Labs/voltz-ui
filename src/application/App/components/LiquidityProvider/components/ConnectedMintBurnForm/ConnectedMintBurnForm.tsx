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
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';
export type ConnectedMintBurnFormProps = {
  amm: AugmentedAMM;
  marginEditMode?: boolean;
  onReset: () => void;
  position?: Position;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({
  amm,
  onReset,
  marginEditMode,
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
      const mint = actions.mintAction(amm, transaction);
      setTransactionId(mint.payload.transaction.id);
      dispatch(mint);
      }  
      
    },
    [setTransactionId, dispatch, agent, amm.id],
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
      <PendingTransaction amm={amm} transactionId={transactionId} onComplete={handleComplete} onBack={handleGoBack} />
    );
  }

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
        onAddOrRemoveMargin={setAddOrRemoveMargin} // this adds the toggle add/remove to the form
        addOrRemoveMargin={addOrRemoveMargin} // this allows you to switch between add and remove on the toggle
      />
    </AMMProvider>
  );
};

export default ConnectedMintBurnForm;

//needs marginEditMode