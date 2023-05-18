import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Pagination } from './index';

describe('<Pagination />', () => {
  it('renders pagination with correct number of pages', () => {
    render(
      <Pagination
        maxPages={5}
        page={2}
        onNextPageClick={() => {}}
        onPreviousPageClick={() => {}}
      />,
    );
    const prevButton = screen.getByText(/previous 01/i);
    const nextButton = screen.getByText(/05 next/i);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('calls onPrevPage when prev button is clicked', () => {
    const onPrevPageMock = jest.fn();
    render(
      <Pagination
        maxPages={5}
        page={2}
        onNextPageClick={() => {}}
        onPreviousPageClick={onPrevPageMock}
      />,
    );
    const prevButton = screen.getByText(/previous 01/i);
    fireEvent.click(prevButton);
    expect(onPrevPageMock).toHaveBeenCalled();
  });

  it('calls onNextPage when next button is clicked', () => {
    const onNextPageMock = jest.fn();
    render(
      <Pagination
        maxPages={5}
        page={2}
        onNextPageClick={onNextPageMock}
        onPreviousPageClick={() => {}}
      />,
    );
    const nextButton = screen.getByText(/05 next/i);
    fireEvent.click(nextButton);
    expect(onNextPageMock).toHaveBeenCalled();
  });

  it('disables prev button on first page', () => {
    render(
      <Pagination
        maxPages={5}
        page={0}
        onNextPageClick={() => {}}
        onPreviousPageClick={() => {}}
      />,
    );
    const prevButton = screen.getByTestId('Pagination-PreviousActionButton-disabled');
    expect(prevButton).toBeInTheDocument();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        maxPages={5}
        page={4}
        onNextPageClick={() => {}}
        onPreviousPageClick={() => {}}
      />,
    );
    const nextButton = screen.getByTestId('Pagination-NextActionButton-disabled');
    expect(nextButton).toBeInTheDocument();
  });
});
