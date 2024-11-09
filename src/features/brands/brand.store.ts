'use client';
import { create } from 'zustand'
import { CarBrand } from '@lib/_generated/graphql_sdk'

interface BrandState {
  brands: CarBrand[];
  setBrands: (brands: CarBrand[]) => void;
  addBrand: (brand: CarBrand) => void;
  updateBrand: (updatedBrand: CarBrand) => void;
  removeBrand: (id: CarBrand['id']) => void;
}

const useBrandStore = create<BrandState>((set) => ({
  brands: [],
  setBrands: (brands) => set({ brands }),
  addBrand: (brand) => set((state) => ({ brands: [...state.brands, brand] })),
  updateBrand: (updatedBrand) =>
    set((state) => ({
      brands: state.brands.map((brand) =>
        brand.id === updatedBrand.id ? updatedBrand : brand
      ),
    })),
  removeBrand: (id) =>
    set((state) => ({
      brands: state.brands.filter((brand) => brand.id !== id),
    })),
}));

export default useBrandStore;
