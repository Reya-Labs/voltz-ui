import { render, screen } from '@testing-library/react';
import React from 'react';

import { BadgePill } from './BadgePill';

describe('<BadgePill />', () => {
  it('renders skeleton when loading is true', () => {
    render(<BadgePill loading={true} variant="referror" />);
    expect(screen.getByTestId('BadgePill-Skeleton')).toBeInTheDocument();
  });

  it('renders the correct badge pill text when loading is false', () => {
    const variant = 'deltaDegen';
    render(<BadgePill loading={false} variant={variant} />);
    expect(screen.getByText('Trader: Tier 1')).toBeInTheDocument();
  });

  it('renders the correct color token based on the tier', () => {
    const variant = 'deltaDegen';
    render(<BadgePill loading={false} variant={variant} />);
    expect(screen.getByTestId(`BadgePill-Pill-tier1-trader-deltaDegen`)).toBeInTheDocument();
  });
});
