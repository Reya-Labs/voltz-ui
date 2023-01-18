import { render, screen } from '@testing-library/react';
import React from 'react';

import { Background } from './Background';

describe('<Background />', () => {
  it('should render BackgroundBox, BackgroundNeonsBox and Neons', () => {
    render(<Background />);
    expect(screen.getByTestId('Background-BackgroundBox')).toBeInTheDocument();
    expect(screen.getByTestId('Background-BackgroundNeonsBox')).toBeInTheDocument();
    expect(screen.getByTestId('Neons-NeonBoxInner')).toBeInTheDocument();
    expect(screen.getByTestId('Neons-NeonBoxOuter')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(<Background>Test</Background>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
