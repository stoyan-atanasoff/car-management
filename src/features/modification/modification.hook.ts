'use client';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  CarCoupe,
  CarModification,
  CarModificationData,
  CreateModificationMutation,
  InputMaybe,

} from '@lib/_generated/graphql_sdk'
import useModificationStore from '@/features/modification/modification.store';
import { GraphQLBackend } from '@lib/api/graphql';
import useToastStore from '@/features/toasts/toast.store'
import { CustomErrorResponse } from '@/types/CustomErrorResponse'
import { CarModificationFix } from '@/features/modification/types'

export const useModificationAdd = () => {
  const queryClient = useQueryClient();
  const addModificationToStore = useModificationStore((state) => state.addModification);
  const toastStore = useToastStore();

  return useMutation<CarModification, CustomErrorResponse, {
    name: CarModification['name'],
    modelId: string,
    coupe: string,
    horsePower: string,
    weight: string
  }>({
    mutationFn: async ({ name, modelId, coupe, horsePower, weight }) => {
      let createdEntry: CreateModificationMutation | undefined;
      try {
        // Step 1: Create the entry
        createdEntry = await GraphQLBackend.CreateModification({ name, modelId });

        // Step 2: Attempt to edit the created entry
        const updatedEntry = await GraphQLBackend.EditModification({
          data: {
            coupe: coupe as InputMaybe<CarCoupe> | undefined,
            horsePower: Number(horsePower),
            id: String(createdEntry.createCarModification.id),
            name: name,
            weight: Number(weight),
          }
        });
        return createdEntry.createCarModification;
      } catch (error) {
        // Step 3: If editing fails, delete the created entry
        if (createdEntry) {
          await GraphQLBackend.DeleteModification({ id: createdEntry.createCarModification.id });
        }
        throw error;
      }
    },
    onSuccess: async (data) => {
      addModificationToStore(data);
      await queryClient.invalidateQueries({ queryKey: ['modification'] });
      toastStore.success({ title: 'Success', message: 'Modification has been created successfully' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to edit modification', message: err.message });
      });
    },
  });
}

export const useModification = (modelId?: number | null) => {
  const upsertModification = useModificationStore((state) => state.upsertModification);

  return useQuery<CarModification[]>({
    queryKey: ['modification', modelId],
    enabled: !!modelId,
    queryFn: async () => {
      const response = await GraphQLBackend.GetCarModifications({ modelId: String(modelId) });
      response.carModifications.forEach(upsertModification); // Store each modification in Zustand
      return response.carModifications;
    },
  });
};

export const useAllModifications = () => {
  const setModifications = useModificationStore((state) => state.setModifications);

  return useQuery<CarModificationFix[]>({
    queryKey: ['modifications'],
    queryFn: async () => {
      // Fetch data from the backend and update Zustand store
      const response = await GraphQLBackend.GetAllCarModifications();
      setModifications(response.allCarModifications);
      return response.allCarModifications as unknown as CarModificationFix[];
    },
    staleTime: Infinity
  });
};

export const useModificationEdit = () => {
  const queryClient = useQueryClient();
  const updateModificationInStore = useModificationStore((state) => state.updateModification);
  const toastStore = useToastStore();

  return useMutation<CarModification, CustomErrorResponse, CarModificationData>({
    mutationFn: async (data) => {
      const response = await GraphQLBackend.EditModification({ data })
      return response.editCarModification;
    },
    onSuccess: async (data) => {
      updateModificationInStore(data);
      await queryClient.invalidateQueries({ queryKey: ['modification'] });
      toastStore.success({ title: 'Successfully', message: 'Modification has been edited' });
    },
    onError: (error) => {
      error.response.errors.forEach((err) => {
        toastStore.error({ title: 'Failed to edit modification', message: err.message });
      });
    },
  });
};

export const useModificationRemove = () => {
  const queryClient = useQueryClient();
  const removeModificationFromStore = useModificationStore((state) => state.removeModification);
  const toastStore = useToastStore();

  return useMutation<void, CustomErrorResponse, { id: string, silent?: boolean, invalidateCache?: boolean }>({
    mutationFn: async ({ id }) => {
      await GraphQLBackend.DeleteModification({ id });
    },
    onSuccess: async (_, { id, silent, invalidateCache }) => {
      removeModificationFromStore(id);
      if (invalidateCache) {
        await queryClient.invalidateQueries({ queryKey: ['modifications'] });
      }
      if (!silent) {
        toastStore.success({ title: 'Successfully', message: 'Modification has been deleted' });
      }
    },
    onError: (error, { silent }) => {
      if (!silent) {
        error.response.errors.forEach((err) => {
          toastStore.error({ title: 'Failed to delete modification', message: err.message });
        });
      }
    },
  });
};