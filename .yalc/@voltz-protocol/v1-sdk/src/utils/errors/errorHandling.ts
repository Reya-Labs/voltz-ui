import { BigNumber, ethers, utils } from 'ethers';
import { abi as FactoryABI } from '../../ABIs/Factory.json';
import { sentryTracker } from '../sentry';
import { CRITICAL_ERROR_MESSAGE } from './constants';
import * as errorJson from './errorMapping.json';

const iface = new ethers.utils.Interface(FactoryABI);

const getErrorData = (error: any): string => {
  try {
    if (typeof error.error.error.data.data === 'string') {
      return error.error.error.data.data;
    }
  } catch (_) {}

  try {
    if (typeof error.error.data.originalError.data === 'string') {
      return error.error.data.originalError.data;
    }
  } catch (_) {}

  try {
    if (typeof error.data.data.data === 'string') {
      return error.data.data.data;
    }
  } catch (_) {}

  try {
    if (typeof error.data.data === 'string') {
      return error.data.data;
    }
  } catch (_) {}

  try {
    if (typeof error.error.data === 'string') {
      return error.error.data;
    }
  } catch (_) {}

  try {
    if (typeof error.data === 'string') {
      return error.data;
    }
  } catch (_) {}

  console.error(`Unknown error type. ${error}`);
  sentryTracker.captureException(error);
  sentryTracker.captureMessage(`Unknown error type. ${error}`);
  throw new Error(CRITICAL_ERROR_MESSAGE);
};

const getErrorSignature = (error: any): string => {
  const reason = getErrorData(error);

  try {
    if (reason.startsWith('0x08c379a0')) {
      return 'Error';
    }

    const decodedError = iface.parseError(reason);
    const errSig = decodedError.signature.split('(')[0];
    return errSig;
  } catch {
    console.error(`Failing to get error signature. ${error}`);
    sentryTracker.captureException(error);
    sentryTracker.captureMessage(`Failing to get error signature. ${error}`);
    throw new Error(CRITICAL_ERROR_MESSAGE);
  }
};

const getReadableErrorMessageWithoutSentry = (error: any): string => {
  const errSig = getErrorSignature(error);

  if (errSig === 'Error') {
    const reason = getErrorData(error);

    try {
      // Remove the error signature
      const encodedMessage = reason.slice(0, 2).concat(reason.slice(10));

      const rawErrorMessage = utils.defaultAbiCoder.decode(['string'], encodedMessage)[0];

      if (Object.keys(errorJson).some((e) => e === rawErrorMessage)) {
        return errorJson[rawErrorMessage as keyof typeof errorJson];
      }
    } catch (_) {}

    return CRITICAL_ERROR_MESSAGE;
  }

  try {
    return errorJson[errSig as keyof typeof errorJson];
  } catch (_) {}

  return CRITICAL_ERROR_MESSAGE;
};

export const getReadableErrorMessage = (error: any): string => {
  const message = getReadableErrorMessageWithoutSentry(error);
  sentryTracker.captureException(error);
  sentryTracker.captureMessage(`Error message: ${message}`);
  return message;
};

export type RawInfoPostMint = {
  marginRequirement: BigNumber;
};

export const decodeInfoPostMint = (error: any): RawInfoPostMint => {
  const errSig = getErrorSignature(error);
  if (errSig === 'MarginLessThanMinimum') {
    const reason = getErrorData(error);
    const decodingResult = iface.decodeErrorResult(errSig, reason);

    return {
      marginRequirement: decodingResult.marginRequirement,
    };
  }

  sentryTracker.captureException(error);
  sentryTracker.captureMessage(`Failing to get info post mint.`);
  throw new Error(getReadableErrorMessage(error));
};

export type RawInfoPostSwap = {
  marginRequirement: BigNumber;
  tick: number;
  fee: BigNumber;
  availableNotional: BigNumber;
  fixedTokenDeltaUnbalanced: BigNumber;
  fixedTokenDelta: BigNumber;
};

export const decodeInfoPostSwap = (error: any): RawInfoPostSwap => {
  const errSig = getErrorSignature(error);
  if (errSig === 'MarginRequirementNotMet') {
    const reason = getErrorData(error);
    const decodingResult = iface.decodeErrorResult(errSig, reason);

    return {
      marginRequirement: decodingResult.marginRequirement,
      tick: decodingResult.tick,
      fee: decodingResult.cumulativeFeeIncurred,
      availableNotional: decodingResult.variableTokenDelta,
      fixedTokenDelta: decodingResult.fixedTokenDelta,
      fixedTokenDeltaUnbalanced: decodingResult.fixedTokenDeltaUnbalanced,
    };
  }

  sentryTracker.captureException(error);
  sentryTracker.captureMessage(`Failing to get info post swap.`);
  throw new Error(getReadableErrorMessage(error));
};
