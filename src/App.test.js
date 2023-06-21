import { render, screen } from '@testing-library/react';
import App from './App';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('assert list has 3 items', () => {
  render(<App />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(3)
});

test('assert element is in document using data-testid', () => {
  render(<App />);
  const titleElement = screen.getByTitle(/Sample-Title/i);
  expect(titleElement).toBeDefined();
});

test('assert sum of a and b is 6', () => {
  render(<App />);
  const sumElement = screen.getByTestId("sum-of");
  expect(sumElement.textContent).toBe("6");
});