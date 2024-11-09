'use client';

import { create } from 'zustand'

interface ModificationsTableState {
  selectedRows: number[];
  selectRows: (id: number[]) => void;
  deselectRows: (id: number[]) => void;
}

const useModificationsTableStore = create<ModificationsTableState>((set) => ({
  selectedRows: [],
  selectRows: (id) => set((state) => ({
    selectedRows: [
      ...state.selectedRows,
      ...id.filter((rowId) => !state.selectedRows.includes(rowId))]
  })),
  deselectRows: (id) =>
    set((state) => ({
      selectedRows: state.selectedRows.filter((rowId) => !id.includes(rowId)),
    })),
}));

export default useModificationsTableStore;
