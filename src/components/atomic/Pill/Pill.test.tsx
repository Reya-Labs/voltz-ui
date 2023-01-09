import { render, screen } from '@testing-library/react';

import { Pill } from './Pill';

describe('<Pill />', () => {
  test('renders the correct text and variant', () => {
    const text = 'Hello';
    const variant = 'wildStrawberry';
    render(<Pill text={text} variant={variant} />);
    const pillTypography = screen.getByTestId(`Pill-PillTypography-${variant}`);
    expect(pillTypography).toHaveTextContent(text);
  });

  test('renders the correct className', () => {
    const className = 'my-custom-class';
    render(<Pill className={className} text="Hello" variant="wildStrawberry" />);
    const pillTypography = screen.getByTestId('Pill-PillTypography-wildStrawberry');
    expect(pillTypography).toHaveClass(className);
  });
});
