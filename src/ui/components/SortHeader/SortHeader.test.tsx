import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SortHeader } from '.';

describe('<SortHeader />', () => {
  it('renders SortHeader component', () => {
    render(
      <SortHeader
        direction="noSort"
        disabled={false}
        loading={false}
        text="Example Text"
        onClick={jest.fn()}
      />,
    );
    const sortHeader = screen.getByTestId('SortHeader-enabled');
    expect(sortHeader).toBeInTheDocument();
  });

  it('renders disabled SortHeader component', () => {
    render(
      <SortHeader
        direction="noSort"
        disabled={true}
        loading={false}
        text="Example Text"
        onClick={jest.fn()}
      />,
    );
    const sortHeader = screen.getByTestId('SortHeader-disabled');
    expect(sortHeader).toBeInTheDocument();
  });

  it('calls onClick when SortHeader is clicked', () => {
    const onClick = jest.fn();
    render(
      <SortHeader
        direction="noSort"
        disabled={false}
        loading={false}
        text="Example Text"
        onClick={onClick}
      />,
    );
    const sortHeader = screen.getByTestId('SortHeader-enabled');
    fireEvent.click(sortHeader);
    expect(onClick).toHaveBeenCalled();
  });
});
