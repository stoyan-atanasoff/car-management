'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import useBrandStore from '@/features/brands/brand.store';
import useModelStore from '@/features/model/model.store';
import useModificationStore from '@/features/modification/modification.store';

interface StoreContextValue {
  brandStore: ReturnType<typeof useBrandStore>;
  modelStore: ReturnType<typeof useModelStore>;
  modificationStore: ReturnType<typeof useModificationStore>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const brandStore = useBrandStore();
  const modelStore = useModelStore();
  const modificationStore = useModificationStore();

  return (
    <StoreContext.Provider value={{ brandStore, modelStore, modificationStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStores must be used within a StoreProvider');
  }
  return context;
};