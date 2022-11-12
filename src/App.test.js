
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders reset button', () => { // eslint-disable-line no-undef
  render(<App />);
  const buttonElement = screen.getByText(/reset/i);
  expect(buttonElement).toBeInTheDocument(); //eslint-disable-line no-undef
});
