import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Match Scoreboard', () => {
  render(<App />);
  const divElement = screen.getByText(/Start Match/i);
  expect(divElement).toBeInTheDocument();
});
