import { render, screen } from '@testing-library/react';
import React from 'react';

import { NewLinkIndicator } from './NewLinkIndicator';

describe('<NewLinkIndicator />', () => {
  it('renders the new link indicator icon', () => {
    render(<NewLinkIndicator />);
    const icon = screen.getByTestId('NewLinkIndicator');
    expect(icon).toBeInTheDocument();
  });
});
