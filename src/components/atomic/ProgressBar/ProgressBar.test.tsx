import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './ProgressBar.stories';

const { Default } = composeStories(stories);

describe('<ProgressBar />', () => {
  it('should render proper UI', () => {
    render(<Default />);

    expect(screen.getByTestId('ProgressBar-Container')).not.toBeNull();
    expect(screen.getByTestId('ProgressBar-ContentBox')).not.toBeNull();
    expect(screen.getByTestId('ProgressBar-LeftContent')).not.toBeNull();
    expect(screen.getByTestId('ProgressBar-LeftContent')).toHaveTextContent('Power');
    expect(screen.getByTestId('ProgressBar-MiddleContent')).not.toBeNull();
    expect(screen.getByTestId('ProgressBar-MiddleContent')).toHaveTextContent('');
    expect(screen.getByTestId('ProgressBar-RightContent')).not.toBeNull();
    expect(screen.getByTestId('ProgressBar-RightContent')).toHaveTextContent('1.21 GWatt');
    expect(screen.getByTestId('ProgressBar-PercentageBox')).not.toBeNull();
  });
});
