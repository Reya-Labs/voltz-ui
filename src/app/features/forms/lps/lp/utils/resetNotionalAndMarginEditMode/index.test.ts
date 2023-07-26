import { resetNotionalAndMarginEditMode } from '.';

describe('resetNotionalAndMarginEditMode', () => {
  it('should set notionalAmount.editMode and marginAmount.editMode to "add"', () => {
    const state = {
      userInput: {
        notionalAmount: { editMode: 'subtract' },
        marginAmount: { editMode: 'subtract' },
      },
    };
    resetNotionalAndMarginEditMode(state as never);
    expect(state.userInput.notionalAmount.editMode).toEqual('add');
    expect(state.userInput.marginAmount.editMode).toEqual('add');
  });
});
