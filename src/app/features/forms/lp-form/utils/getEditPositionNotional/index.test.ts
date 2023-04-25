import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getEditPositionNotional } from './index';

describe('getEditPositionNotional', () => {
  let state: Draft<SliceState>;

  beforeEach(() => {
    state = {
      selectedPosition: null,
      userInput: {
        notionalAmount: {
          value: 0,
          editMode: 'add',
          error: '',
        },
      },
    } as never;
  });

  it('should return 0 if there is no selected position and no notional amount', () => {
    const result = getEditPositionNotional(state);
    expect(result).toEqual(0);
  });

  it('should return the notional amount if there is no selected position and an add edit mode', () => {
    state.userInput.notionalAmount.value = 100;
    const result = getEditPositionNotional(state);
    expect(result).toEqual(100);
  });

  it('should subtract the notional amount if there is no selected position and a remove edit mode and return 0', () => {
    state.userInput.notionalAmount.value = 100;
    state.userInput.notionalAmount.editMode = 'remove';
    const result = getEditPositionNotional(state);
    expect(result).toEqual(0);
  });

  it('should return the selected position notional if there is no notional amount', () => {
    state.selectedPosition = {
      id: '123',
      notional: 500,
      maxMarginWithdrawable: 1000,
    } as never;
    const result = getEditPositionNotional(state);
    expect(result).toEqual(500);
  });

  it('should add the notional amount to the selected position notional if in add edit mode', () => {
    state.selectedPosition = {
      id: '123',
      notional: 500,
      maxMarginWithdrawable: 1000,
    } as never;
    state.userInput.notionalAmount.value = 100;
    const result = getEditPositionNotional(state);
    expect(result).toEqual(600);
  });

  it('should subtract the notional amount from the selected position notional if in remove edit mode', () => {
    state.selectedPosition = {
      id: '123',
      notional: 500,
      maxMarginWithdrawable: 1000,
    } as never;
    state.userInput.notionalAmount.value = 100;
    state.userInput.notionalAmount.editMode = 'remove';
    const result = getEditPositionNotional(state);
    expect(result).toEqual(400);
  });

  it('should return 0 if the resulting notional amount would be negative', () => {
    state.selectedPosition = {
      id: '123',
      notional: 500,
      maxMarginWithdrawable: 1000,
    } as never;
    state.userInput.notionalAmount.value = 700;
    state.userInput.notionalAmount.editMode = 'remove';
    const result = getEditPositionNotional(state);
    expect(result).toEqual(0);
  });
});
