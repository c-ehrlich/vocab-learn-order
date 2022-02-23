import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useStore from '../../store';
import Header from '../../components/Header';
import { act } from 'react-dom/test-utils';
import { testServerResponse as serverResponse } from '../testData';

const originalState = useStore.getState();
beforeEach(() => {
  useStore.setState(originalState);
});

test("it should contain a settings slider if we're in Input", () => {
  render(<Header />, { wrapper: MemoryRouter });
  const settingsButton = screen.getByLabelText('settings');
  expect(settingsButton).toBeInTheDocument();
  const backButton = screen.queryByLabelText('back');
  expect(backButton).not.toBeInTheDocument();
});

test("it should contain a menu slider if we're in Results", () => {
  render(<Header />, { wrapper: MemoryRouter });
  act(() => {
    useStore.setState({ ...originalState, serverResponse: serverResponse });
  });

  const backButton = screen.getByLabelText('back');
  expect(backButton).toBeInTheDocument();

  const settingsButton = screen.queryByLabelText('settings');
  expect(settingsButton).not.toBeInTheDocument();
});

test("the help modal should have a button to create sample data if we're in Input", () => {
  render(<Header />, { wrapper: MemoryRouter });
  const helpButton = screen.getByLabelText('help');
  expect(helpButton).toBeInTheDocument();
  fireEvent.click(helpButton);

  const createSampleInputButton = screen.getByLabelText('Create Sample Input');
  expect(createSampleInputButton).toBeInTheDocument();
})

test("the help modal should not have a button to create sample data if we're in Results", () => {
  render(<Header />, { wrapper: MemoryRouter });

  act(() => {
    useStore.setState({ ...originalState, serverResponse: serverResponse });
  });

  const helpButton = screen.getByLabelText('help');
  expect(helpButton).toBeInTheDocument();
  fireEvent.click(helpButton);

  const createSampleInputButton = screen.queryByLabelText('Create Sample Input');
  expect(createSampleInputButton).not.toBeInTheDocument();
})
