'use client';

import { create } from 'zustand';
import { AccentColor } from '@/types/AccentColor';

interface SettingsState {
  theme: 'dark' | 'light';
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  toggleTheme: () => void;
}

const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: typeof window !== 'undefined' ? localStorage?.getItem('theme') === 'dark' ? 'dark' : 'light' : 'light',
  accent: typeof window !== 'undefined' ? localStorage?.getItem('accentColor') as AccentColor || 'amber' : 'amber',
  setAccent: (accent: AccentColor) => set({ accent }),
  toggleTheme: () => {
    if (get().theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    return set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
  },
}));

export default useSettingsStore;