'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { CarBrand, CarModel, CreateModelMutation } from '@lib/_generated/graphql_sdk'
import useBrandStore from '@/features/model/model.store'
import { GraphQLBackend } from '@lib/api/graphql'
import useToastStore from '@/features/toasts/toast.store'
import { CustomErrorResponse } from '@/types/CustomErrorResponse'

export const useModelAdd = () => {
  const queryClient = useQueryClient();
  const addModelToStore = useBrandStore((state) => state.addModel);
  const toastStore = useToastStore();

  return useMutation<CarModel, CustomErrorResponse, { name: CarModel['name'], brandId: CarBrand['id'] }>({
    mutationFn: async ({ name, brandId }) => {
      const response: CreateModelMutation = await GraphQLBackend.CreateModel({ name, brandId });
      return response.createCarModel;
    },
    onSuccess: async (data) => {
      addModelToStore(data);
      await queryClient.invalidateQueries({ queryKey: ['model'] });
      toastStore.success({ title: 'Successfully', message: 'Model has been created' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to edit model', message: err.message });
      });
    },
  });
}

export const useModels = (brandId?: number) => {
  const setModels = useBrandStore((state) => state.setModels);

  return useQuery<CarModel[]>({
    queryKey: ['model', brandId],
    enabled: !!brandId,
    queryFn: async () => {
      const response = await GraphQLBackend.GetModels({ brandId: brandId as unknown as string })
      setModels(response.carModels);
      return response.carModels
    },
  });
}

export const useModelEdit = () => {
  const queryClient = useQueryClient();
  const updateModelInStore = useBrandStore((state) => state.updateModel);
  const toastStore = useToastStore();

  return useMutation<CarModel, CustomErrorResponse, { id: string; name: string }>({
    mutationFn: async ({ id, name }) => {
      const response = await GraphQLBackend.EditModel({ id, name });
      return response.editCarModel;
    },
    onSuccess: async (data) => {
      updateModelInStore(data);
      await queryClient.invalidateQueries({ queryKey: ['model'] });
      toastStore.success({ title: 'Successfully', message: 'Model has been edited' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to edit model', message: err.message });
      });
    },
  });
};

export const useModelRemove = () => {
  const queryClient = useQueryClient();
  const removeModelFromStore = useBrandStore((state) => state.removeModel);
  const toastStore = useToastStore();

  return useMutation<void, CustomErrorResponse, { id: string }>({
    mutationFn: async ({ id }) => {
      await GraphQLBackend.DeleteModel({ id });
    },
    onSuccess: async (_, { id }) => {
      removeModelFromStore(id);
      await queryClient.invalidateQueries({ queryKey: ['model'] });
      toastStore.success({ title: 'Successfully', message: 'Model has been removed' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to delete model', message: err.message });
      });
    },
  });
};