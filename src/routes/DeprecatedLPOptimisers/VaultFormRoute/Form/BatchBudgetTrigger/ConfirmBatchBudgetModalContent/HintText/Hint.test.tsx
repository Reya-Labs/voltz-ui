import { render, screen } from '@testing-library/react';
import React from 'react';

import { HintText } from './HintText';

describe('HintText', () => {
  it('renders text with no error, warning, or success', () => {
    const text = 'This is a sample text';
    render(<HintText text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByTestId('ErrorTextSpan')).not.toBeInTheDocument();
    expect(screen.queryByTestId('SuccessTextSpan')).not.toBeInTheDocument();
    expect(screen.queryByTestId('WarningTextSpan')).not.toBeInTheDocument();
  });

  it('renders text with error', () => {
    const text = 'This is an error';
    render(<HintText error={true} text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId('HintText-ErrorTextSpan')).toBeInTheDocument();
    expect(screen.queryByTestId('SuccessTextSpan')).not.toBeInTheDocument();
    expect(screen.queryByTestId('WarningTextSpan')).not.toBeInTheDocument();
  });

  it('renders text with success', () => {
    const text = 'This is a success';
    render(<HintText success={true} text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByTestId('ErrorTextSpan')).not.toBeInTheDocument();
    expect(screen.getByTestId('HintText-SuccessTextSpan')).toBeInTheDocument();
    expect(screen.queryByTestId('WarningTextSpan')).not.toBeInTheDocument();
  });

  it('renders text with warning', () => {
    const text = 'This is a warning';
    render(<HintText text={text} warning={true} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.queryByTestId('ErrorTextSpan')).not.toBeInTheDocument();
    expect(screen.queryByTestId('SuccessTextSpan')).not.toBeInTheDocument();
    expect(screen.getByTestId('HintText-WarningTextSpan')).toBeInTheDocument();
  });

  it('renders text with prefix and suffix', () => {
    const prefix = 'prefix:';
    const text = 'This is a text';
    const suffix = ':suffix';
    render(<HintText prefixText={prefix} suffixText={suffix} text={text} />);
    expect(screen.getByTestId('HintText-HintTextTypography')).toBeInTheDocument();
    expect(screen.getByTestId('HintText-HintTextTypography').textContent).toEqual(
      `${prefix} ${text} ${suffix}`,
    );
  });

  it('renders loading ellipsis', () => {
    const text = 'This is a text';
    render(<HintText loading={true} text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId('EllipsisTypography')).toBeInTheDocument();
  });
});
