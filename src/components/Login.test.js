import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

// jest.mock("axios", () => ({
//   __esModule: true,
//   get: jest.fn(() =>
//     Promise.resolve({
//       data: { id: 1, name: "John" }
//     })
//   )
// }));


jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));


test('getByPlaceholderText: username input should be rendered and empty', () => {
  render(<Login />);
  const usernameInputElement = screen.getByPlaceholderText(/Username/i);
  expect(usernameInputElement).toBeInTheDocument();
  expect(usernameInputElement.value).toBe("");
});

test('getByPlaceholderText: password input should be rendered and empty', () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement).toBeInTheDocument();
  expect(passwordInputElement.value).toBe("");
});

test('getByRole: button should be rendered and disabled', () => {
  render(<Login />);
  const loginButtonElement = screen.getByRole("button");
  expect(loginButtonElement).toBeInTheDocument();
  expect(loginButtonElement).toBeDisabled();
});

test('getByTestId: button error should not be visible', () => {
  render(<Login />);
  const errorElement = screen.getByTestId("login-error");
  expect(errorElement).not.toBeVisible();
});

test('username input should change', () => {
  render(<Login />);
  const usernameInputElement = screen.getByPlaceholderText(/Username/i);
  const usernameText = "Harry@gmail.com";
  fireEvent.change(usernameInputElement, { target: { value: usernameText } });
  expect(usernameInputElement.value).toBe(usernameText);
});

test('password input should change', () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const passwordText = "password";
  fireEvent.change(passwordInputElement, { target: { value: passwordText } });
  expect(passwordInputElement.value).toBe(passwordText);
});

test('login button should be disabled before, enabled after username and password are both entered', () => {
  render(<Login />);
  const usernameInputElement = screen.getByPlaceholderText(/Username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const loginButtonElement = screen.getByRole("button");
  const usernameText = "Harry@gmail.com";
  const passwordText = "password";
  fireEvent.change(usernameInputElement, { target: { value: usernameText } });
  // Will be disabled since only username is entered
  expect(loginButtonElement).toBeDisabled();
  fireEvent.change(passwordInputElement, { target: { value: passwordText } });
  // Will be enabled since both username and password are entered
  expect(loginButtonElement).toBeEnabled();
});

test('loading message should not be displayed initially', () => {
  render(<Login />);
  const loginButtonElement = screen.getByRole("button");
  expect(loginButtonElement.textContent).not.toContain('Please Wait');
});

test('loading message should be displayed after form submission before axios API call', async () => {
  render(<Login />);
  const usernameInputElement = screen.getByPlaceholderText(/Username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const loginButtonElement = screen.getByRole("button");
  const usernameText = "Harry@gmail.com";
  const passwordText = "password";
  fireEvent.change(usernameInputElement, { target: { value: usernameText } });
  // Will be disabled since only username is entered
  // expect(loginButtonElement).toBeDisabled();
  fireEvent.change(passwordInputElement, { target: { value: passwordText } });
  // Will be enabled since both username and password are entered
  // expect(loginButtonElement).toBeEnabled();
  fireEvent.click(loginButtonElement);
  expect(loginButtonElement.textContent).toContain('Please Wait')
});

test('login button should display \'Login\' after axios finished API call from \'Please Wait\'', async () => {
  render(<Login />);
  const usernameInputElement = screen.getByPlaceholderText(/Username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const loginButtonElement = screen.getByRole("button");
  const usernameText = "Harry@gmail.com";
  const passwordText = "password";
  fireEvent.change(usernameInputElement, { target: { value: usernameText } });
  // Will be disabled since only username is entered
  expect(loginButtonElement).toBeDisabled();
  fireEvent.change(passwordInputElement, { target: { value: passwordText } });
  // Will be enabled since both username and password are entered
  expect(loginButtonElement).toBeEnabled();
  fireEvent.click(loginButtonElement);
  await waitFor(() => {
    expect(loginButtonElement).not.toHaveTextContent('Please Wait');
  });
});

test('mocked response username to be displayed on login button click', async () => {
  render(<Login />);
  const usernameInputElement = screen.getByPlaceholderText(/Username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const loginButtonElement = screen.getByRole("button");
  const usernameText = "Harry@gmail.com";
  const passwordText = "password";
  fireEvent.change(usernameInputElement, { target: { value: usernameText } });
  // Will be disabled since only username is entered
  expect(loginButtonElement).toBeDisabled();
  fireEvent.change(passwordInputElement, { target: { value: passwordText } });
  // Will be enabled since both username and password are entered
  expect(loginButtonElement).toBeEnabled();
  fireEvent.click(loginButtonElement);
    const userElement = await screen.findByText("John")
    expect(userElement).toHaveTextContent(/john/i);
});
