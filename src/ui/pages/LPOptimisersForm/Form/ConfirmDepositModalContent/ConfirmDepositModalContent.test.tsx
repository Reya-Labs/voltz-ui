import { fireEvent, render, screen } from '@testing-library/react';

import { ConfirmDepositModalContent } from './ConfirmDepositModalContent';

describe('<ConfirmDepositModalContent />', () => {
  const onProceedMock = jest.fn();
  const onCancelMock = jest.fn();
  const hintText = 'Please double check the details before proceeding';
  const hintSuffixText = 'This action cannot be undone';
  const submitText = 'Confirm Deposit';
  const token = 'eth';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the correct title', () => {
    render(
      <ConfirmDepositModalContent
        depositFeeUnderlying={-1}
        depositFeeUSD={-1}
        disabled={false}
        gasCost={-1}
        hintText={hintText}
        hintTextError={false}
        hintTextSuccess={false}
        hintTextSuffixText={hintSuffixText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const title = screen.getByTestId('ConfirmDepositModalContent-TitleTypography');
    expect(title).toHaveTextContent('Deposit');
  });

  it('displays loading text when gasCost, depositFeeUSD and depositFeeUnderlying prop is -1', () => {
    render(
      <ConfirmDepositModalContent
        depositFeeUnderlying={-1}
        depositFeeUSD={-1}
        disabled={false}
        gasCost={-1}
        hintText={hintText}
        hintTextError={false}
        hintTextSuccess={false}
        hintTextSuffixText={hintSuffixText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const depositFeeLoading = screen.getByTestId('ConfirmDepositModalContent-DepositFeeLoading');
    expect(depositFeeLoading).toHaveTextContent('---');
  });

  it('displays the deposit fee in USD and underlying token', () => {
    render(
      <ConfirmDepositModalContent
        depositFeeUnderlying={2}
        depositFeeUSD={10}
        disabled={false}
        gasCost={-1}
        hintText={hintText}
        hintTextError={false}
        hintTextSuccess={false}
        hintTextSuffixText={hintSuffixText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const depositBudgetUnderlyingTypography = screen.getByTestId(
      'ConfirmDepositModalContent-DepositBudgetUnderlyingTypography',
    );
    const depositBudgetTextTypography = screen.getByTestId(
      'ConfirmDepositModalContent-DepositBudgetTextTypography',
    );
    expect(depositBudgetUnderlyingTypography).toHaveTextContent('2 ETH');
    expect(depositBudgetTextTypography).toHaveTextContent('$10 USD');
  });

  it('calls the onProceed function when the Confirm Deposit button is clicked', () => {
    render(
      <ConfirmDepositModalContent
        depositFeeUnderlying={2}
        depositFeeUSD={10}
        disabled={false}
        gasCost={-1}
        hintText={hintText}
        hintTextError={false}
        hintTextSuccess={false}
        hintTextSuffixText={hintSuffixText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const confirmDepositButton = screen.getByTestId('ConfirmDepositModalContent-DepositButton');
    fireEvent.click(confirmDepositButton);
    expect(onProceedMock).toHaveBeenCalled();
  });

  it('calls the onCancel function when the Cancel button is clicked', () => {
    render(
      <ConfirmDepositModalContent
        depositFeeUnderlying={2}
        depositFeeUSD={10}
        disabled={false}
        gasCost={-1}
        hintText={hintText}
        hintTextError={false}
        hintTextSuccess={false}
        hintTextSuffixText={hintSuffixText}
        loading={false}
        submitText={submitText}
        success={false}
        token={token}
        onCancel={onCancelMock}
        onProceed={onProceedMock}
      />,
    );
    const cancelButton = screen.getByTestId('ConfirmDepositModalContent-CancelButton');
    fireEvent.click(cancelButton);
    expect(onCancelMock).toHaveBeenCalled();
  });
});
