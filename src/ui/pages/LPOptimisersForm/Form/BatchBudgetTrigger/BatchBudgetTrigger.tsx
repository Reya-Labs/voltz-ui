import { submitAllBatchesForFee } from '@voltz-protocol/v1-sdk';
import { Button, Dialog, TokenTypography, Typography } from 'brokoli-ui';
import React, { useEffect, useReducer, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import { formFormatNumber } from '../../../../../app/features/forms/common';
import {
  OptimiserInfo,
  updateOptimiserStateAction,
} from '../../../../../app/features/lp-optimisers';
import { selectChainId } from '../../../../../app/features/network';
import { doNothing } from '../../../../../utilities/doNothing';
import { getAlchemyKey } from '../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../utilities/getInfuraKey';
import { useWallet } from '../../../../hooks/useWallet';
import { GasCost } from '../GasCost/GasCost';
import { batchBudgetReducer, initialState } from './batchBudgetReducer';
import {
  ActionBox,
  ActionLeftContentBox,
  ActionRightContentBox,
  BatchBudgetContentBox,
  BatchBudgetValueBox,
  ContentBox,
} from './BatchBudgetTrigger.styled';
import { ConfirmBatchBudgetModalContent } from './ConfirmBatchBudgetModalContent/ConfirmBatchBudgetModalContent';

type Props = {
  lpVault: OptimiserInfo;
  onOpen?: () => void;
  onClose?: () => void;
};

export const BatchBudgetTrigger: React.FunctionComponent<Props> = ({
  lpVault,
  onOpen = doNothing,
  onClose = doNothing,
}) => {
  const { signer } = useWallet();
  const appDispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);

  const [gasCost, setGasCost] = useState(-1);
  const [isConfirmBatchBudgetOpen, setIsConfirmBatchBudgetOpen] = useState(false);
  const handleConfirmBatchClose = () => {
    setIsConfirmBatchBudgetOpen(false);
    onClose();
  };
  const handleConfirmBatchOpen = () => {
    setIsConfirmBatchBudgetOpen(true);
    onOpen();
  };
  const [state, dispatch] = useReducer(batchBudgetReducer, initialState);
  const handleOnProceed = () => {
    if (!signer || !chainId) {
      return;
    }

    dispatch({
      type: 'batch_pending',
    });

    submitAllBatchesForFee({
      optimiserId: lpVault.optimiserId,
      signer,
      chainId,
      alchemyApiKey: getAlchemyKey(),
      infuraApiKey: getInfuraKey(),
    })
      .then(({ newOptimiserState }) => {
        void dispatch({
          type: 'batch_success',
        });
        if (newOptimiserState) {
          void appDispatch(
            updateOptimiserStateAction({
              optimiserId: lpVault.optimiserId,
              newOptimiserState,
              chainId,
            }),
          );
        }
      })
      .catch((err) => {
        const message = typeof err === 'string' ? err : (err as Error)?.message;
        dispatch({
          type: 'batch_failed',
          errorMessage: message || 'Ooops something went wrong!',
        });
      });
  };

  useEffect(() => {
    if (!signer || !chainId) {
      return;
    }

    submitAllBatchesForFee({
      onlyGasEstimate: true,
      optimiserId: lpVault.optimiserId,
      signer,
      chainId,
      alchemyApiKey: getAlchemyKey(),
      infuraApiKey: getInfuraKey(),
    })
      .then(({ gasEstimateUsd }) => {
        setGasCost(gasEstimateUsd);
      })
      .catch(() => {
        setGasCost(-1);
      });
  }, [lpVault, signer]);

  return (
    <>
      <Dialog open={isConfirmBatchBudgetOpen}>
        <ConfirmBatchBudgetModalContent
          batchBudgetUnderlying={lpVault.accumulatedFees}
          batchBudgetUSD={lpVault.accumulatedFeesUSD}
          disabled={state.disabled}
          error={state.error}
          gasCost={gasCost}
          hintText={state.hintText}
          loading={state.loading}
          submitText={state.submitText}
          success={state.success}
          token={lpVault.tokenName}
          onCancel={handleConfirmBatchClose}
          onProceed={handleOnProceed}
        />
      </Dialog>
      <ContentBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          Trigger the batch of deposits, and claim the batch budget at any time! Careful with the
          batch gas cost.
        </Typography>
        <GasCost gasCost={gasCost} />
        <ActionBox>
          <ActionLeftContentBox>
            <BatchBudgetContentBox>
              <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
                Batch Budget:&nbsp;
              </Typography>
              <BatchBudgetValueBox>
                <TokenTypography
                  colorToken="skyBlueCrayola"
                  data-testid="BatchBudgetTrigger-BatchBudgetUnderlyingTypography"
                  token={` ${lpVault.tokenName.toUpperCase()}`}
                  typographyToken="primaryBodySmallRegular"
                  value={formFormatNumber(lpVault.accumulatedFees)}
                />
                <TokenTypography
                  colorToken="lavenderWeb"
                  data-testid="BatchBudgetTrigger-BatchBudgetTextTypography"
                  prefixToken="$"
                  token=" USD"
                  typographyToken="primaryBodySmallRegular"
                  value={formFormatNumber(lpVault.accumulatedFeesUSD)}
                />
              </BatchBudgetValueBox>
            </BatchBudgetContentBox>
          </ActionLeftContentBox>
          <ActionRightContentBox>
            <Button
              data-testid="BatchBudgetTrigger-BatchButton"
              variant="secondary"
              onClick={handleConfirmBatchOpen}
            >
              Batch
            </Button>
          </ActionRightContentBox>
        </ActionBox>
      </ContentBox>
    </>
  );
};
