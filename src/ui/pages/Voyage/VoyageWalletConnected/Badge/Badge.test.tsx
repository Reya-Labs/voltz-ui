import React from 'react';

import { render, screen } from '../../../../../test-helpers';
import { Badge } from './Badge';

describe('<Badge />', () => {
  it('renders skeleton when loading is true', () => {
    render(<Badge loading={true} variant={1} />);
    expect(screen.getByTestId('Badge-Skeleton')).toBeInTheDocument();
  });

  it('renders icon when loading is false', () => {
    render(<Badge loading={false} variant={1} />);
    expect(screen.getByTestId('Badge-1')).toBeInTheDocument();
  });
});
