import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useStore from '../store';
import Header from './Header';
import { act } from 'react-dom/test-utils';
import { TServerResponse } from '../types/TServerResponse.type';

const serverResponse: TServerResponse = {
  words: [
    {
      word: '学校',
      jmdict: ['school'],
      animeJDrama: 479,
      bccwj: 424,
      innocent: 690,
      kokugojiten: 860,
      narou: 1193,
      netflix: 457,
      novels: 419,
      vn: 485,
      wikipedia: 60,
      jlpt: [[5, 'N5']],
    },
    {
      word: '停留所',
      jmdict: ['stop (bus, tram, etc.)', 'station', 'stopping place'],
      animeJDrama: 38693,
      bccwj: 31415,
      innocent: 19440,
      kokugojiten: 30945,
      netflix: 31139,
      wikipedia: 2792,
      jlpt: [[3, 'N3']],
    },
  ],
  notFound: [],
};

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
