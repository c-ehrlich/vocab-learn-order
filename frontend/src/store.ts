import create from 'zustand';
import { IServerResponse } from './interfaces/IServerResponse';
import { IFrequencyListWeights } from './interfaces/IFrequencyListWeights';
import { getLocalStorageOrDefault, setLocalStorage } from './utils/localStorageHelpers';

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
  serverResponse: IServerResponse | null;
  setServerResponse: (serverResponse: IServerResponse | null) => void;
  frequencyListWeights: IFrequencyListWeights;
  setFrequencyListWeights: (freqencyListWeights: IFrequencyListWeights) => void;
}

const useStore = create<AppState>((set) => ({
  serverResponse: null,
  setServerResponse: (serverResponse: IServerResponse | null) => {
    set((state) => ({ ...state, serverResponse }));
  },
  frequencyListWeights: getLocalStorageOrDefault(
    'frequency-list-weights',
    defaultFrequencyListWeights
  ),
  setFrequencyListWeights: (frequencyListWeights: IFrequencyListWeights) => {
    setLocalStorage('frequency-list-weights', frequencyListWeights);
    set((state) => ({ ...state, frequencyListWeights }));
  },
}));



export default useStore;
