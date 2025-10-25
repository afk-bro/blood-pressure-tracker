import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders the counter button', () => {
  render(<App />)
  // unique, semantic query
  expect(screen.getByRole('button', { name: /count/i })).toBeInTheDocument()
})