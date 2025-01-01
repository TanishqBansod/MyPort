// TransparentButton.test.js (Create a new test file)
import { render, screen } from '@testing-library/react';
import TransparentButton from './components/TransparentButton';

test('renders the transparent button', () => {
  render(<TransparentButton />);
  const buttonElement = screen.getByText(/Click Me/i); // Change this to match the text in your button
  expect(buttonElement).toBeInTheDocument();
});
