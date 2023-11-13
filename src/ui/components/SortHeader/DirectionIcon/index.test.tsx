import React from 'react';

import { render, screen } from '../../../../test-helpers';
import { DirectionIcon } from '.';

describe('<DirectionIcon />', () => {
  it('renders NoSortIcon when direction is "noSort"', () => {
    render(<DirectionIcon direction="noSort" />);
    const noSortIcon = screen.getByTestId('DirectionIcon-NoSortIcon');
    expect(noSortIcon).toBeInTheDocument();
  });

  it('renders AscendingSortIcon when direction is "ascending"', () => {
    render(<DirectionIcon direction="ascending" />);
    const ascendingSortIcon = screen.getByTestId('DirectionIcon-AscendingSortIcon');
    expect(ascendingSortIcon).toBeInTheDocument();
  });

  it('renders DescendingSortIcon when direction is "descending"', () => {
    render(<DirectionIcon direction="descending" />);
    const descendingSortIcon = screen.getByTestId('DirectionIcon-DescendingSortIcon');
    expect(descendingSortIcon).toBeInTheDocument();
  });
});
