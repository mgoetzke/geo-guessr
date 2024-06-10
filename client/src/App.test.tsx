import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

test('renders game with start button and basic info', () => {
  render(<App/>);
  const instructions = screen.getByText(/Learn about/i);
  expect(instructions).toBeTruthy();

  const startButton = screen.getByRole('button')
  expect(startButton).toBeTruthy();
});

test.skip('allows user to start game', () => {
  render(<App/>);
  const startButton = screen.getByRole('button')

  fireEvent(
    startButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )

  const instructions = screen.getByText(/Where in the world/i);
  expect(instructions).toBeTruthy();
});

// test that mocks success game
// test that mocks failed game
