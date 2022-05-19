import { AugmentedAMM } from "@utilities";
import { BigNumber } from "ethers";
import { Token } from "@voltz-protocol/v1-sdk";
import { isUndefined } from "lodash";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useWallet from "./useWallet";

export enum MintBurnFormLiquidityAction {
  ADD='add',
  BURN='burn'
};

export enum MintBurnFormMarginAction {
  ADD='add',
  REMOVE='remove'
};

export type MintBurnFormState = {
  fixedLow?: number;
  fixedHigh?: number;
  liquidityAction: MintBurnFormLiquidityAction;
  margin?: number;
  marginAction: MintBurnFormMarginAction;
  notional?: number;
};

export type MintBurnForm = {
  balance?: BigNumber;
  errors: Record<string, string>,
  setFixedHigh: Dispatch<SetStateAction<MintBurnFormState['fixedHigh']>>;
  setFixedLow: Dispatch<SetStateAction<MintBurnFormState['fixedLow']>>;
  setLiquidityAction: Dispatch<SetStateAction<MintBurnFormState['liquidityAction']>>;
  setMargin: Dispatch<SetStateAction<MintBurnFormState['margin']>>;
  setMarginAction: Dispatch<SetStateAction<MintBurnFormState['marginAction']>>;
  setNotional: Dispatch<SetStateAction<MintBurnFormState['notional']>>;
  state: MintBurnFormState,
  validate: (isEditingMargin: boolean, isEditingLiquidity: boolean) => boolean;
};

export const useMintBurnForm = (amm: AugmentedAMM, defaultValues: Partial<MintBurnFormState> = {}): MintBurnForm => {
  const defaultFixedHigh = !isUndefined(defaultValues.fixedHigh) ? defaultValues.fixedHigh : undefined;
  const defaultFixedLow = !isUndefined(defaultValues.fixedLow) ? defaultValues.fixedLow : undefined;
  const defaultLiquidityAction = defaultValues.liquidityAction || MintBurnFormLiquidityAction.ADD;
  const defaultMargin = !isUndefined(defaultValues.margin) ? defaultValues.margin : 0;
  const defaultMarginAction = defaultValues.marginAction || MintBurnFormMarginAction.ADD;
  const defaultNotional = !isUndefined(defaultValues.notional) ? defaultValues.notional : 0;

  const [fixedHigh, setFixedHigh] = useState<MintBurnFormState['fixedHigh']>(defaultFixedHigh);
  const [fixedLow, setFixedLow] = useState<MintBurnFormState['fixedLow']>(defaultFixedLow);
  const [liquidityAction, setLiquidityAction] = useState<MintBurnFormLiquidityAction>(defaultLiquidityAction);
  const [margin, setMargin] = useState<MintBurnFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<MintBurnFormMarginAction>(defaultMarginAction);
  const [notional, setNotional] = useState<MintBurnFormState['notional']>(defaultNotional);

  const [balance, setBalance] = useState<BigNumber>();
  const [errors, setErrors] = useState<MintBurnForm['errors']>({});
  const { getTokenBalance } = useWallet();
  const token = useRef<Token>();

  // Load the users balance of the required token so we can use it for validation later
  useEffect(() => {
    if(token.current?.id !== amm.underlyingToken.id) {
      token.current = amm.underlyingToken;
      getTokenBalance(amm.underlyingToken)
        .then((currentBalance) => {
          setBalance(currentBalance);
        })
        .catch(() => {
          setBalance(undefined);
        })
    }
  }, [amm.underlyingToken, amm.underlyingToken.id, getTokenBalance]);

  const validate = (isEditingMargin: boolean, isEditingLiquidity: boolean) => {
    if(!isEditingMargin && !isEditingLiquidity) {
      return validateNewPosition();
    } else if(isEditingMargin) {
      return validateEditMargin();
    } else {
      return validateEditLiquidity();
    }
  }

  const validateNewPosition = () => {
    const err: Record<string, string> = {};

    if(isUndefined(fixedLow)) {
      err['fixedLow'] = 'Please enter a value';
    }

    if(isUndefined(fixedHigh)) {
      err['fixedHigh'] = 'Please enter a value';
    }
      
    if(!isUndefined(fixedLow) && !isUndefined(fixedHigh) && fixedLow >= fixedHigh) {
      err['fixedLow'] = 'Lower Rate must be smaller than Upper Rate';
    }

    if(isUndefined(notional) || notional === 0) {
      err['notional'] = 'Please enter an amount';
    } 

    if(isUndefined(margin)) {
      err['margin'] = 'Please enter an amount';
    }

    // check user has sufficient funds
    if(!isUndefined(notional) && notional !== 0 && !isUndefined(margin) && !isUndefined(balance)) {
      if(amm.descale(balance) < (margin + notional)) {
        err['notional'] = 'Insufficient funds';

        // Only set the error on the margin field if the value !== 0
        if (margin !== 0) {
          err['margin'] = 'Insufficient funds';
        }
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateEditMargin = () => {
    const err: Record<string, string> = {};

    if(isUndefined(margin) || margin === 0) {
      err['margin'] = 'Please enter an amount';
    }

    // If adding margin
    if(marginAction === MintBurnFormMarginAction.ADD) {
      // check user has sufficient funds
      if(!isUndefined(balance) && !isUndefined(margin)) {
        if(amm.descale(balance) < margin) {
          err['margin'] = 'Insufficient funds';
        }
      }
    }
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateEditLiquidity = () => {
    const err: Record<string, string> = {};

    if(isUndefined(notional) || notional === 0) {
      err['notional'] = 'Please enter an amount';
    } 

    if(isUndefined(margin)) {
      err['margin'] = 'Please enter an amount';
    }

    // If adding liquidity
    if(liquidityAction === MintBurnFormLiquidityAction.ADD) {
      // check user has sufficient funds
      if(!isUndefined(notional) && notional !== 0 && !isUndefined(margin) && !isUndefined(balance)) {
        if(amm.descale(balance) < (margin + notional)) {
          err['notional'] = 'Insufficient funds';

          // Only set the error on the margin field if the value !== 0
          if (margin !== 0) {
            err['margin'] = 'Insufficient funds';
          }
        }
      }
    }
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return {
    balance,
    errors,
    setFixedHigh,
    setFixedLow,
    setLiquidityAction,
    setMargin,
    setMarginAction,
    setNotional,
    state: {
      fixedHigh,
      fixedLow,
      liquidityAction,
      margin,
      marginAction,
      notional
    },
    validate
  }
}

export default useMintBurnForm;