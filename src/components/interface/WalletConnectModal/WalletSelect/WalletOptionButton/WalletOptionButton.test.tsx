import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { WalletOptionButton, WalletOptionButtonProps } from './WalletOptionButton';

describe('<WalletOptionButton />', () => {
  let props: WalletOptionButtonProps;

  beforeEach(() => {
    props = {
      title: 'Option 1',
      disabled: false,
    };
  });

  it('renders the title and an icon if provided', () => {
    props.icon = 'metamask';
    render(<WalletOptionButton {...props} />);
    const button = screen.getByTestId(`WalletOptionButton-${props.title}`);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByTestId('Icon-metamask')).toBeInTheDocument();
    expect(button).not.toHaveAttribute('disabled');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    props.onClick = onClick;
    render(<WalletOptionButton {...props} />);
    const button = screen.getByTestId(`WalletOptionButton-${props.title}`);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('applies the disabled styles when disabled', () => {
    props.disabled = true;
    render(<WalletOptionButton {...props} />);
    const button = screen.getByTestId(`WalletOptionButton-${props.title}`);
    expect(button).toHaveAttribute('disabled', '');
  });
});
