import { SwapFormSubmitButtonHintStates } from '../../../contexts/SwapFormContext/enums';

export const getNotionalActionFromHintState = (hint: SwapFormSubmitButtonHintStates): string => {
  switch (hint) {
    case SwapFormSubmitButtonHintStates.REMOVE_AND_ADD:
    case SwapFormSubmitButtonHintStates.REMOVE_AND_REMOVE:
      return 'REMOVE';
    case SwapFormSubmitButtonHintStates.ADD_AND_ADD:
    case SwapFormSubmitButtonHintStates.ADD_AND_REMOVE:
      return 'ADD';
    default:
      return '';
  }
};
