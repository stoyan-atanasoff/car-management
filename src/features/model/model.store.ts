'use client';
import { create } from 'zustand'
import { CarModel } from '@lib/_generated/graphql_sdk'

interface ModelState {
  models: CarModel[];
  setModels: (models: CarModel[]) => void;
  addModel: (model: CarModel) => void
  updateModel: (updateModel: CarModel) => void;
  removeModel: (id: CarModel['id']) => void;
}

const useModelStore = create<ModelState>((set) => ({
  models: [],
  setModels: (models) => set({ models }),
  addModel: (model) => set((state) => ({ models: [...state.models, model] })),
  updateModel: (updateModel) =>
    set((state) => ({
      models: state.models.map((model) =>
        model.id === updateModel.id ? updateModel : model
      ),
    })),
  removeModel: (id) =>
    set((state) => ({
      models: state.models.filter((model) => model.id !== id),
    })),
}));

export default useModelStore;
