"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Toast from "@radix-ui/react-toast";

import { Toasts } from '@/features/toasts/Toasts'
import { StoreProvider } from './store'
import useSettingsStore from '@/features/settings/settings.store'
import { Theme } from '@radix-ui/themes'


const ThemeProvider = ({ children }: PropsWithChildren) => {
  const settingsStore = useSettingsStore();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, [settingsStore.theme]);

  if (!hydrated) return null;

  return (
    <Theme appearance={settingsStore.theme} accentColor={settingsStore.accent} grayColor="sand" radius="large" scaling="100%">
      {children}
    </Theme>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <ThemeProvider>
          <Toast.Provider swipeDirection="right">
            {children}
            <Toasts />
            <Toast.Viewport className="ToastViewport" />
          </Toast.Provider>
        </ThemeProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}