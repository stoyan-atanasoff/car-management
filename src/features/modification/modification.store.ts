'use client';

import { create } from 'zustand';

import { CarModification } from '@lib/_generated/graphql_sdk';

interface ModificationState {
  modifications: CarModification[];
  setModifications: (modifications: CarModification[]) => void;
  addModification: (modification: CarModification) => void;
  updateModification: (updateModification: CarModification) => void;
  removeModification: (id: CarModification['id']) => void;
  upsertModification: (modification: CarModification) => void; // New method for adding/updating a single modification
}

const useModificationStore = create<ModificationState>((set) => ({
  modifications: [],
  setModifications: (modifications) => set({ modifications }),
  addModification: (modification) =>
    set((state) => ({ modifications: [...state.modifications, modification] })),
  updateModification: (updateModification) =>
    set((state) => ({
      modifications: state.modifications.map((modification) =>
        modification.id === updateModification.id ? updateModification : modification
      ),
    })),
  removeModification: (id) =>
    set((state) => ({
      modifications: state.modifications.filter((modification) => modification.id !== id),
    })),
  upsertModification: (modification) =>
    set((state) => {
      const exists = state.modifications.some((m) => m.id === modification.id);
      return {
        modifications: exists
          ? state.modifications.map((m) => (m.id === modification.id ? modification : m))
          : [...state.modifications, modification],
      };
    }),
}));

export default useModificationStore;
