import create from 'zustand';
import { TServerResponse } from './types/TServerResponse.type';
import { TFrequencyListWeights } from './types/TFrequencyListWeights.type';
import {
  getLocalStorageOrDefault,
  setLocalStorage,
} from './utils/localStorageHelpers';

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
  textInput: '',
  setTextInput: (textInput: string) =>
    set((state) => ({ ...state, textInput })),
}));

export default useStore;
