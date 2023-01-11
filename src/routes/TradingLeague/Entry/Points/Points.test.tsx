import { render, screen, waitFor } from '@testing-library/react';

import { Points } from './Points';

describe('<Points />', () => {
  it('renders "---" when points is 0', () => {
    render(<Points points={0} />);
    expect(screen.getByText('---')).toBeInTheDocument();
  });

  it('renders "---" when points is negative', () => {
    render(<Points points={-1} />);
    expect(screen.getByText('---')).toBeInTheDocument();
  });

  it('renders the CountUp component with the correct props when points is positive', async () => {
    const points = 100;
    render(<Points points={points} />);
    await waitFor(() => screen.getByText('100.00'), {
      timeout: 2500,
    });
  });
});
