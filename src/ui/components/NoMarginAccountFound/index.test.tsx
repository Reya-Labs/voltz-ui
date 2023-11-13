import React from 'react';

import { render, screen } from '../../../test-helpers';
import { NoMarginAccountFound } from '.';

describe('<NoMarginAccountFound />', () => {
  const mockTo = '/pools';

  it('should render the title and subtitle correctly', () => {
    render(<NoMarginAccountFound to={mockTo} />);

    const title = screen.getByTestId('NoMarginAccountFound-Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Margin account not found');

    const subtitle = screen.getByTestId('NoMarginAccountFound-Subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      "Unfortunately we couldn't fetch any existing margin account matching this criteria. We encourage you to visit our pool page",
    );
  });

  it('should render the app link correctly', () => {
    render(<NoMarginAccountFound to={mockTo} />);

    const appLink = screen.getByTestId('NoMarginAccountFound-AppLink');
    expect(appLink).toBeInTheDocument();
    expect(appLink).toHaveTextContent('visit our pool page');
    expect(appLink).toHaveAttribute('href', `#${mockTo}`);
  });
});
