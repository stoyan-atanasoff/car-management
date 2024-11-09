'use client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { CarBrand, CreateBrandMutation } from '@lib/_generated/graphql_sdk';
import useBrandStore from '@/features/brands/brand.store';
import { GraphQLBackend } from '@lib/api/graphql';
import useToastStore from '@/features/toasts/toast.store'
import { CustomErrorResponse } from '@/types/CustomErrorResponse'

// Fetch all brands
export const useBrands = () => {
  const setBrands = useBrandStore((state) => state.setBrands);

  return useQuery<CarBrand[]>({
    queryKey: ['brands'], // Consistent query key
    queryFn: async () => {
      const response = await GraphQLBackend.GetBrands();
      setBrands(response.carBrands);
      return response.carBrands;
    },
    staleTime: Infinity,
  });
};

// Add a brand
export const useBrandAdd = () => {
  const queryClient = useQueryClient();
  const addBrandToStore = useBrandStore((state) => state.addBrand);
  const toastStore = useToastStore();

  return useMutation<CarBrand, CustomErrorResponse, { name: CarBrand['name'] }>({
    mutationFn: async ({ name }) => {
      const response: CreateBrandMutation = await GraphQLBackend.CreateBrand({ name });
      return response.createCarBrand;
    },
    onSuccess: (data) => {
      addBrandToStore(data);
      queryClient.invalidateQueries({ queryKey: ['brands'] }); // Invalidate with consistent key
      toastStore.success({ title: 'Successfully', message: 'Brand has been created' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to add brand', message: err.message });
      });
    },
  });
};

// Edit a brand
export const useBrandEdit = () => {
  const queryClient = useQueryClient();
  const updateBrandInStore = useBrandStore((state) => state.updateBrand);
  const toastStore = useToastStore();

  return useMutation<CarBrand, CustomErrorResponse, { id: string; name: string }>({
    mutationFn: async ({ id, name }) => {
      const response = await GraphQLBackend.EditBrand({ id, name });
      return response.editCarBrand;
    },
    onSuccess: (data) => {
      updateBrandInStore(data);
      queryClient.invalidateQueries({ queryKey: ['brands'] }); // Consistent key
      toastStore.success({ title: 'Successfully', message: 'Brand has been edited' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to update brand', message: err.message });
      });
    },
  });
};

// Delete a brand
export const useBrandDelete = () => {
  const queryClient = useQueryClient();
  const removeBrandFromStore = useBrandStore((state) => state.removeBrand);
  const toastStore = useToastStore();

  return useMutation<void, CustomErrorResponse, { id: string }>({
    mutationFn: async ({ id }) => {
      await GraphQLBackend.DeleteBrand({ id });
    },
    onSuccess: (_, { id }) => {
      removeBrandFromStore(id);
      queryClient.invalidateQueries({ queryKey: ['brands']}); // Consistent key
      toastStore.success({ title: 'Successfully', message: 'Brand has been deleted' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to delete brand', message: err.message });
      });
    },
  });
};
