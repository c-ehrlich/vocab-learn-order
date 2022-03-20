import create from 'zustand';
import { TServerResponse } from './types/TServerResponse.type';
import { TFrequencyListWeights } from './types/TFrequencyListWeights.type';
import {
  getLocalStorageOrDefault,
  setLocalStorage,
} from './utils/localStorageHelpers';
import { TWord } from './types/TWord.type';

const defaultFrequencyListWeights: TFrequencyListWeights = {
  animeJDrama: 40,
  bccwj: 30,
  innocent: 30,
  kokugojiten: 10,
  narou: 30,
  netflix: 90,
  novels: 40,
  vn: 20,
  wikipedia: 30,
};

interface AppState {
  frequencyListWeights: TFrequencyListWeights;
  setFrequencyListWeights: (freqencyListWeights: TFrequencyListWeights) => void;
  serverResponse: TServerResponse | null;
  setServerResponse: (serverResponse: TServerResponse | null) => void;
  removeWordFromServerResponse: (word: TWord) => void;
  removeNotFoundWordFromServerResponse: (word: string) => void;
  textInput: string;
  setTextInput: (text: string) => void;
}

const useStore = create<AppState>((set) => ({
  frequencyListWeights: getLocalStorageOrDefault(
    'frequency-list-weights',
    defaultFrequencyListWeights
  ),
  setFrequencyListWeights: (frequencyListWeights: TFrequencyListWeights) => {
    setLocalStorage('frequency-list-weights', frequencyListWeights);
    set((state) => ({ ...state, frequencyListWeights }));
  },
  serverResponse: null,
  setServerResponse: (serverResponse: TServerResponse | null) => {
    set((state) => ({ ...state, serverResponse }));
  },
  removeWordFromServerResponse: (word: TWord): void => {
    set((state) => ({
      ...state,
      serverResponse: removeWord({
        serverResponse: state.serverResponse!,
        word,
      }),
    }));
  },
  removeNotFoundWordFromServerResponse: (word: string): void => {
    set((state) => ({
      ...state,
      serverResponse: removeNotFoundWord({
        serverResponse: state.serverResponse!,
        word
      })
    }))
  },
  textInput: '',
  setTextInput: (textInput: string) =>
    set((state) => ({ ...state, textInput })),
}));

function removeWord({
  serverResponse,
  word,
}: {
  serverResponse: TServerResponse;
  word: TWord;
}): TServerResponse {
  const index = serverResponse.words.indexOf(word);
  if (index >= 0) {
    serverResponse.words = ([] as TWord[]).concat(
      serverResponse.words.slice(0, index),
      serverResponse.words.slice(index + 1)
    );
  }
  return serverResponse;
}

function removeNotFoundWord({
  serverResponse,
  word,
}: {
  serverResponse: TServerResponse;
  word: string;
}): TServerResponse {
  const index = serverResponse.notFound.indexOf(word);
  if (index >= 0) {
    serverResponse.notFound = ([] as string[]).concat(
      serverResponse.notFound.slice(0, index),
      serverResponse.notFound.slice(index + 1)
    );
  }
  return serverResponse;
}

export default useStore;
