import React from 'react';

import { fireEvent, render, screen } from '../../../../../../test-helpers';
import { ConfirmBatchBudgetModalContent } from './ConfirmBatchBudgetModalContent';

describe('ConfirmBatchBudgetModalContent', () => {
  const onProceedMock = jest.fn();
  const onCancelMock = jest.fn();
  const hintText = 'This is a test hint';
  const submitText = 'CONFIRM BATCH BUDGET';
  const token = 'ETH';

  it('displays the batch budget in USD and underlying token', () => {
    render(
      <ConfirmBatchBudgetModalContent
        batchBudgetUnderlying={2}
        batchBudgetUSD={10}
        disabled={false}
        error={false}
        gasCost={-1}
        hintText={hintText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const batchBudgetUnderlyingTypography = screen.getByTestId(
      'ConfirmBatchBudgetModalContent-BatchBudgetUnderlyingTypography',
    );
    const batchBudgetTextTypography = screen.getByTestId(
      'ConfirmBatchBudgetModalContent-BatchBudgetTextTypography',
    );

    expect(batchBudgetUnderlyingTypography).toHaveTextContent('2 ETH');
    expect(batchBudgetTextTypography).toHaveTextContent('$10 USD');
  });

  it('displays loading when the batch budget is -1', () => {
    render(
      <ConfirmBatchBudgetModalContent
        batchBudgetUnderlying={-1}
        batchBudgetUSD={-1}
        disabled={false}
        error={false}
        gasCost={-1}
        hintText={hintText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const batchBudgetLoading = screen.getByTestId(
      'ConfirmBatchBudgetModalContent-BatchBudgetLoading',
    );
    expect(batchBudgetLoading).toHaveTextContent('---');
  });

  it('calls the onProceed function when the Confirm Batch Budget button is clicked', () => {
    render(
      <ConfirmBatchBudgetModalContent
        batchBudgetUnderlying={2}
        batchBudgetUSD={10}
        disabled={false}
        error={false}
        gasCost={-1}
        hintText={hintText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const confirmBatchBudgetButton = screen.getByTestId(
      'ConfirmBatchBudgetModalContent-BatchButton',
    );
    fireEvent.click(confirmBatchBudgetButton);

    expect(onProceedMock).toHaveBeenCalled();
  });

  it('calls the onCancel function when the Cancel button is clicked', () => {
    render(
      <ConfirmBatchBudgetModalContent
        batchBudgetUnderlying={2}
        batchBudgetUSD={10}
        disabled={false}
        error={false}
        gasCost={-1}
        hintText={hintText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const cancelButton = screen.getByTestId('ConfirmBatchBudgetModalContent-CancelButton');
    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalled();
  });
});
