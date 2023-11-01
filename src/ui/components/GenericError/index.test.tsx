import React from 'react';

import { render, screen } from '../../../test-helpers';
import { GenericError } from '.';

describe('<GenericError />', () => {
  const mockTo = '/pools';

  it('should render the title and subtitle correctly', () => {
    render(<GenericError to={mockTo} />);

    const title = screen.getByTestId('GenericError-Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Oops... Something went wrong!');

    const subtitle = screen.getByTestId('GenericError-Subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      "Unfortunately we couldn't process your request. We encourage you to report this to our support team, and in the meantime please visit our pool page.",
    );
  });

  it('should render the app link correctly', () => {
    render(<GenericError to={mockTo} />);

    const appLink = screen.getByTestId('GenericError-AppLink');
    expect(appLink).toBeInTheDocument();
    expect(appLink).toHaveTextContent('visit our pool page');
    expect(appLink).toHaveAttribute('href', `#${mockTo}`);
  });
});
