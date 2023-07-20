import { render, screen } from '@testing-library/react';
import React from 'react';

import { PageLoading } from '.';

describe('<PageLoading />', () => {
  it('renders PageLoading component', () => {
    render(<PageLoading />);
    const pageLoading = screen.getByTestId('PageLoading-LoadingBox');
    expect(pageLoading).toBeInTheDocument();
  });

  it('renders RainbowLoader component inside PageLoading', () => {
    render(<PageLoading />);
    const rainbowLoader = screen.getByTestId('PageLoading-RainbowLoader');
    expect(rainbowLoader).toBeInTheDocument();
  });
});
