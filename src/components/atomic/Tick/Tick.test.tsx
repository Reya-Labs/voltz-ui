import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Tick } from './Tick';

describe('<Tick />', () => {
  it('renders without crashing', () => {
    render(<Tick />);
  });

  it('calls onAnimationEnd prop when animation ends', () => {
    const onAnimationEnd = jest.fn();
    render(<Tick onAnimationEnd={onAnimationEnd} />);
    const tickElement = screen.getByTestId('Tick-TickPart1');
    fireEvent.animationEnd(tickElement);
    expect(onAnimationEnd).toHaveBeenCalled();
  });
});
