import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useStore from '../../store';
import Input from '../../components/Input';

const originalState = useStore.getState();
beforeEach(() => {
  useStore.setState(originalState);
});

test("it should have a search box that the user can type into", () => {
  render(<Input />, { wrapper: MemoryRouter });
  const textInput: HTMLTextAreaElement = screen.getByLabelText("Paste words here");
  expect(textInput).toBeInTheDocument();

  fireEvent.change(textInput, {target: {value: "foo"}});
  expect(textInput.value).toBe("foo");
});

test("it should have a button that clears the content of the search box", () => {
  render(<Input />, { wrapper: MemoryRouter });
  const textInput: HTMLTextAreaElement = screen.getByLabelText("Paste words here");
  expect(textInput).toBeInTheDocument();

  fireEvent.change(textInput, {target: {value: "foo"}});
  expect(textInput.value).toBe("foo");

  const resetButton: HTMLButtonElement = screen.getByLabelText("clear");
  fireEvent.click(resetButton);
  expect(textInput.value).toBe("");
})
