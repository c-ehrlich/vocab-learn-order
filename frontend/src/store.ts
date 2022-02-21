import create from 'zustand';
import { IServerResponse } from './interfaces/IServerResponse';
import { IFrequencyListWeights } from './interfaces/IFrequencyListWeights';
import {
  getLocalStorageOrDefault,
  setLocalStorage,
} from './utils/localStorageHelpers';

const defaultFrequencyListWeights: IFrequencyListWeights = {
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
  frequencyListWeights: IFrequencyListWeights;
  setFrequencyListWeights: (freqencyListWeights: IFrequencyListWeights) => void;
  serverResponse: IServerResponse | null;
  setServerResponse: (serverResponse: IServerResponse | null) => void;
  textInput: string;
  setTextInput: (text: string) => void;
}

const useStore = create<AppState>((set) => ({
  frequencyListWeights: getLocalStorageOrDefault(
    'frequency-list-weights',
    defaultFrequencyListWeights
  ),
  setFrequencyListWeights: (frequencyListWeights: IFrequencyListWeights) => {
    setLocalStorage('frequency-list-weights', frequencyListWeights);
    set((state) => ({ ...state, frequencyListWeights }));
  },
  serverResponse: null,
  setServerResponse: (serverResponse: IServerResponse | null) => {
    set((state) => ({ ...state, serverResponse }));
  },
  textInput: '',
  setTextInput: (textInput: string) =>
    set((state) => ({ ...state, textInput })),
}));

export default useStore;
