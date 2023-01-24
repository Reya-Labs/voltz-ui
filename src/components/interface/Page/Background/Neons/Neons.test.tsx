import { render, screen } from '@testing-library/react';

import { Neons } from './Neons';

describe('<Neons />', () => {
  it('should render NeonBoxInner and NeonBoxOuter', () => {
    render(<Neons />);
    expect(screen.getByTestId('Neons-NeonBoxInner')).toBeInTheDocument();
    expect(screen.getByTestId('Neons-NeonBoxOuter')).toBeInTheDocument();
  });
});
