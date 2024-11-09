'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useParams } from 'next/navigation'

type FormContextType = {
  isCreateMode: boolean;
  isAddMode: boolean;
  isDeleteMode: boolean;
  isUpdateMode: boolean;
  mode: 'create' | 'add' | 'delete' | 'update' | null;
  modelId: number | null;
  modificationId: number | null;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  /*
    Handle 4 types of URLs
    /edit/create - create new (Create mode)
    /edit/1 - update not specified modification (Update mode)
    /edit/1/2 - update modification ID 2 (Update mode)
    /edit/1/add - add modification to model ID 1 (Add mode)
   */
  const { args } = params;
  const isCreateMode = args[0] === 'create';
  const isAddMode = args[1] === 'add';
  const isDeleteMode = args[2] === 'delete';
  const isUpdateMode = args[2] === 'update' ||!Number.isNaN(parseInt(args[0], 10));

  const mode = isCreateMode
    ? 'create'
    : isAddMode
      ? 'add'
      : isDeleteMode
        ? 'delete'
        : isUpdateMode
          ? 'update'
          : null;
  const modelId = !isCreateMode && (isUpdateMode || isDeleteMode) ? Number(args[0]) : null;
  const modificationId = (isUpdateMode || isDeleteMode) && !Number.isNaN(parseInt(args[1], 10)) ? Number(args[1]) : null;

  return (
    <FormContext.Provider
      value={{ isCreateMode, isAddMode, isDeleteMode, isUpdateMode, mode, modelId, modificationId }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};