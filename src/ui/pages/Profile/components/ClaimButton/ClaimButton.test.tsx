import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { formatPOSIXTimestamp } from '../../../../../utilities/date';
import { ClaimButton, ClaimButtonProps } from './ClaimButton';

describe('<ClaimButton />', () => {
  const defaultProps: ClaimButtonProps = {
    mode: 'claim',
    displayError: false,
  };

  it('renders correctly in "claim" mode', () => {
    render(<ClaimButton {...defaultProps} />);
    const button = screen.getByTestId('ClaimButton-ClaimButtonStyled-claim');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('Claim');
  });

  it('renders correctly in "claimed" mode', () => {
    const claimedAt = new Date().getTime();
    render(<ClaimButton {...defaultProps} claimedAt={claimedAt} mode="claimed" />);
    const button = screen.getByTestId('ClaimButton-ClaimButtonStyled-claimed');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Claimed');
    const claimedAtTypography = screen.queryByTestId('ClaimButton-ClaimedAtTypography');
    expect(claimedAtTypography).not.toBeInTheDocument();
  });

  it('renders correctly in "claiming" mode', () => {
    render(<ClaimButton {...defaultProps} mode="claiming" />);
    const button = screen.getByTestId('ClaimButton-ClaimButtonStyled-claiming');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('');
  });

  it('renders correctly in "claimError" mode with displayError true', () => {
    render(<ClaimButton {...defaultProps} mode="claimError" displayError />);
    const button = screen.getByTestId('ClaimButton-ClaimButtonStyled-claimError');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('Claim');
    const bottomLeftText = screen.getByText(/Error when claiming, try again/);
    expect(bottomLeftText).toBeInTheDocument();
  });

  it('renders correctly in "claimedDate" mode', () => {
    const claimedAt = new Date().getTime();
    render(<ClaimButton {...defaultProps} claimedAt={claimedAt} mode="claimedDate" />);
    const button = screen.getByTestId('ClaimButton-ClaimButtonStyled-claimedDate');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Claimed');
    const claimedAtTypography = screen.getByTestId('ClaimButton-ClaimedAtTypography');
    expect(claimedAtTypography).toBeInTheDocument();
    expect(claimedAtTypography).toHaveTextContent(formatPOSIXTimestamp(claimedAt));
  });

  it('calls onClick when button is clicked in "claim" mode', () => {
    const onClick = jest.fn();
    render(<ClaimButton {...defaultProps} onClick={onClick} />);
    const button = screen.getByTestId('ClaimButton-ClaimButtonStyled-claim');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('does not call onClick when button is clicked in "claimed" mode', () => {
    const onClick = jest.fn();
    render(<ClaimButton displayError={false} mode="claimed" onClick={onClick} />);
    const button = screen.getByTestId('ClaimButton-ClaimButtonStyled-claimed');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
