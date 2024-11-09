'use client';
import { create } from 'zustand'
import { BaseOption } from '@components/SearchableSelect/types'

interface FormStoreFields {
  name: string;
  brand: BaseOption | null;
  model: BaseOption | null;
  coupe: BaseOption | null;
  weight: string;
  horsepower: string;
}

interface FormStore extends FormStoreFields {
  setName: (name: string) => void;
  setBrand: (brand: BaseOption | null) => void;
  setModel: (model: BaseOption | null) => void;
  setCoupe: (coupe: BaseOption | null) => void;
  setWeight: (weight: string) => void;
  setHorsepower: (horsepower: string) => void;
  getFormFieldValues: () => FormStoreFields;
  setFormFieldValues: (values: FormStoreFields) => void;
  clearFormFieldValues: () => void;
}

const useFormStore = create<FormStore>((set, get) => ({
  name: '',
  brand: null,
  model: null,
  coupe: null,
  weight: '',
  horsepower: '',
  getFormFieldValues: () => ({
    name: get().name,
    brand: get().brand,
    model: get().model,
    coupe: get().coupe,
    weight: get().weight,
    horsepower: get().horsepower,
  }),
  setFormFieldValues: (values: FormStoreFields) => set({
    name: values.name,
    brand: values.brand,
    model: values.model,
    coupe: values.coupe,
    weight: values.weight,
    horsepower: values.horsepower,
  }),
  setName: (name: string) => set({ name }),
  setBrand: (brand: BaseOption | null) => set({ brand }),
  setModel: (model: BaseOption | null) => set({ model }),
  setCoupe: (coupe: BaseOption | null) => set({ coupe }),
  setWeight: (weight: string) => set({ weight }),
  setHorsepower: (horsepower: string) => set({ horsepower }),
  clearFormFieldValues: () => set({
    name: '',
    brand: null,
    model: null,
    coupe: null,
    weight: '',
    horsepower: '',
  }),
}));

export default useFormStore;
