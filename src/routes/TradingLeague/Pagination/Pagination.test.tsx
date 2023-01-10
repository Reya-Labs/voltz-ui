import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Pagination } from './Pagination';

describe('<Pagination />', () => {
  it('renders pagination with correct number of pages', () => {
    render(<Pagination maxPages={5} page={2} onNextPage={() => {}} onPrevPage={() => {}} />);
    const prevButton = screen.getByText(/previous 01/i);
    const nextButton = screen.getByText(/05 next/i);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('calls onPrevPage when prev button is clicked', () => {
    const onPrevPageMock = jest.fn();
    render(<Pagination maxPages={5} page={2} onNextPage={() => {}} onPrevPage={onPrevPageMock} />);
    const prevButton = screen.getByText(/previous 01/i);
    fireEvent.click(prevButton);
    expect(onPrevPageMock).toHaveBeenCalled();
  });

  it('calls onNextPage when next button is clicked', () => {
    const onNextPageMock = jest.fn();
    render(<Pagination maxPages={5} page={2} onNextPage={onNextPageMock} onPrevPage={() => {}} />);
    const nextButton = screen.getByText(/05 next/i);
    fireEvent.click(nextButton);
    expect(onNextPageMock).toHaveBeenCalled();
  });

  it('disables prev button on first page', () => {
    render(<Pagination maxPages={5} page={0} onNextPage={() => {}} onPrevPage={() => {}} />);
    const prevButton = screen.getByText(/previous 01/i);
    expect(prevButton).toHaveAttribute('disabled');
  });

  it('disables next button on last page', () => {
    render(<Pagination maxPages={5} page={4} onNextPage={() => {}} onPrevPage={() => {}} />);
    const nextButton = screen.getByText(/05 next/i);
    expect(nextButton).toHaveAttribute('disabled');
  });
});
