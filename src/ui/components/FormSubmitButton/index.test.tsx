import { fireEvent, render, screen } from '@testing-library/react';

import { FormSubmitButton } from './index';

describe('<FormSubmitButton />', () => {
  it('renders correctly with the given props', () => {
    render(
      <FormSubmitButton
        bottomLeftText="Optional text"
        bottomLeftTextColorToken="wildStrawberry"
        disabled={false}
        loading={false}
        onClick={() => {}}
      >
        Submit
      </FormSubmitButton>,
    );

    const button = screen.getByTestId('FormSubmitButton');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
    expect(button).toBeEnabled();
  });

  it('disables the button and shows loading when loading prop is true, checks if click is disabled', () => {
    const handleClick = jest.fn();
    render(
      <FormSubmitButton
        bottomLeftText="Optional text"
        bottomLeftTextColorToken="wildStrawberry"
        disabled={false}
        loading={true}
        onClick={handleClick}
      >
        Submit
      </FormSubmitButton>,
    );

    const button = screen.getByTestId('FormSubmitButton');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
    expect(button).toBeEnabled();
  });

  it('calls the onClick function when clicked and not loading or disabled', () => {
    const handleClick = jest.fn();

    render(
      <FormSubmitButton
        bottomLeftText="Optional text"
        bottomLeftTextColorToken="wildStrawberry"
        disabled={false}
        loading={false}
        onClick={handleClick}
      >
        Submit
      </FormSubmitButton>,
    );

    const button = screen.getByTestId('FormSubmitButton');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call the onClick function when button is disabled or loading', () => {
    const handleClick = jest.fn();

    render(
      <FormSubmitButton
        bottomLeftText="Optional text"
        bottomLeftTextColorToken="wildStrawberry"
        disabled={true}
        loading={true}
        onClick={handleClick}
      >
        Submit
      </FormSubmitButton>,
    );

    const button = screen.getByTestId('FormSubmitButton');

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
