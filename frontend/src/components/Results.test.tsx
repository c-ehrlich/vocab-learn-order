import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import useStore from '../store';
import { testServerResponse as serverResponse } from '../__test__/testData';
import Results from './Results';

// reset state
const originalState = useStore.getState();
beforeEach(() => {
  useStore.setState(originalState);
});

test('it should render a series of WordCard for words that were found', () => {
  render(<Results />, { wrapper: MemoryRouter });

  act(() => useStore.setState({ ...originalState, serverResponse }));

  const wordCardElements = screen.getAllByLabelText('word-card');
  expect(wordCardElements[0]).toHaveTextContent('学校');
});

test('it should render a series of WordCardMini for words that were not found', () => {
  render(<Results />, { wrapper: MemoryRouter });

  act(() => useStore.setState({ ...originalState, serverResponse }));

  const wordCardElements = screen.getAllByLabelText('word-card-mini');
  expect(wordCardElements[0]).toHaveTextContent('foo');
});
