import create from 'zustand';
import { IServerResponse } from './interfaces/IServerResponse';

interface AppState {
  serverResponse: IServerResponse | null;
  setServerResponse: (serverResponse: IServerResponse | null) => void;
}

const useStore = create<AppState>((set) => ({
  serverResponse: null,
  setServerResponse: (serverResponse: IServerResponse | null) => {
    set((state) => ({ ...state, serverResponse: serverResponse }));
  },
}));

export default useStore;
