import React from 'react';

import { render, screen } from '../../../test-helpers';
import { Page } from '.';

describe('<Page />', () => {
  it('renders with mainSlot', () => {
    render(<Page mainSlot={<div data-testid="MainSlot" />} />);
    const mainSlot = screen.getByTestId('MainSlot');
    expect(mainSlot).toBeInTheDocument();
  });

  it('renders with rightSlot', () => {
    render(<Page mainSlot={<div />} rightSlot={<div data-testid="RightSlot" />} />);
    const rightSlot = screen.getByTestId('RightSlot');
    expect(rightSlot).toBeInTheDocument();
  });

  it('renders with notFoundSlot', () => {
    render(<Page mainSlot={<div />} notFoundSlot={<div data-testid="NotFoundSlot" />} />);
    const notFoundSlot = screen.getByTestId('NotFoundSlot');
    expect(notFoundSlot).toBeInTheDocument();
  });

  it('renders with pageLoadingSlot', () => {
    render(<Page mainSlot={<div />} pageLoadingSlot={<div data-testid="PageLoadingSlot" />} />);
    const pageLoadingSlot = screen.getByTestId('PageLoadingSlot');
    expect(pageLoadingSlot).toBeInTheDocument();
  });

  it('renders with errorSlot', () => {
    render(<Page errorSlot={<div data-testid="ErrorSlot" />} mainSlot={<div />} />);
    const errorSlot = screen.getByTestId('ErrorSlot');
    expect(errorSlot).toBeInTheDocument();
  });

  it('renders with leftPanelSubmenu', () => {
    render(<Page leftPanelSubmenu={<div data-testid="LeftPanelSubmenu" />} mainSlot={<div />} />);
    const leftPanelSubmenu = screen.getByTestId('LeftPanelSubmenu');
    expect(leftPanelSubmenu).toBeInTheDocument();
  });
});
