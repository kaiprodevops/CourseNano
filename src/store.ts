import { create } from 'zustand';

// Define the shape of your store's state
interface AppState {
  isLoading: boolean;
  aiOutput: string;
  setLoading: (loading: boolean) => void;
  setAiOutput: (output: string) => void;
}

// Create the store
export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  aiOutput: '',
  setLoading: (loading) => set({ isLoading: loading }),
  setAiOutput: (output) => set({ aiOutput: output }),
}));