import { render, screen } from '@testing-library/react';
import React from 'react';

import { AlphaBanner } from './AlphaBanner';

describe('AlphaBanner', () => {
  it('renders the correct number of texts', () => {
    render(<AlphaBanner />);
    expect(screen.getAllByTestId('AlphaBanner-Text1').length).toBe(8);
    expect(screen.getAllByTestId('AlphaBanner-Text2').length).toBe(8);
    expect(screen.getAllByTestId('AlphaBanner-Text3').length).toBe(8);
  });

  it('renders the correct text for each text component', () => {
    render(<AlphaBanner />);
    expect(screen.getAllByTestId('AlphaBanner-Text1')[0].textContent).toBe('Voltz alpha');
    expect(screen.getAllByTestId('AlphaBanner-Text2')[0].textContent).toBe('Voltz alpha');
    expect(screen.getAllByTestId('AlphaBanner-Text3')[0].textContent).toBe(
      'Currently in alpha launch. LFG',
    );
  });

  it('renders the correct aria-label', () => {
    render(<AlphaBanner />);
    expect(screen.getByTestId('AlphaBanner-BannerContainer').getAttribute('aria-label')).toBe(
      'Voltz alpha - Currently in alpha launch. LFG.',
    );
  });
});
