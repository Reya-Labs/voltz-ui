import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CopyLinkButton, CopyLinkButtonProps } from './CopyLinkButton';

describe('CopyLinkButton', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    mockOnClick.mockClear();
  });

  const defaultProps: CopyLinkButtonProps = {
    mode: 'copy',
    onClick: mockOnClick,
  };

  it('displays "Copy Link" when in "copy" mode', () => {
    render(<CopyLinkButton {...defaultProps} />);
    expect(screen.getByTestId('CopyLinkButton-CopyLinkButtonUI-copy')).toHaveTextContent(
      'Copy Link',
    );
  });

  it('displays "Copying" when in "copying" mode', () => {
    render(<CopyLinkButton {...defaultProps} mode="copying" />);
    expect(screen.getByTestId('CopyLinkButton-CopyLinkButtonUI-copying')).toHaveTextContent('');
  });

  it('displays "Copied" when in "copied" mode', () => {
    render(<CopyLinkButton {...defaultProps} mode="copied" />);
    expect(screen.getByTestId('CopyLinkButton-CopyLinkButtonUI-copied')).toHaveTextContent(
      'Copied',
    );
  });

  it('displays "Copy Link" when in "copyError" mode', () => {
    render(<CopyLinkButton {...defaultProps} mode="copyError" />);
    expect(screen.getByTestId('CopyLinkButton-CopyLinkButtonUI-copyError')).toHaveTextContent(
      'Copy Link',
    );
  });

  it('displays "Oops, try again" when in "copyError" mode', () => {
    render(<CopyLinkButton {...defaultProps} mode="copyError" />);
    expect(screen.getByText('Oops, try again')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked in "copy" mode', () => {
    render(<CopyLinkButton {...defaultProps} />);
    fireEvent.click(screen.getByTestId('CopyLinkButton-CopyLinkButtonUI-copy'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('does not call onClick when button is clicked in "copied" mode', () => {
    render(<CopyLinkButton {...defaultProps} mode="copied" />);
    fireEvent.click(screen.getByTestId('CopyLinkButton-CopyLinkButtonUI-copied'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
