import React from 'react'
import { Field, useFormikContext } from 'formik'

import SearchableSelect from '@components/SearchableSelect/SearchableSelect'
import { useModelAdd, useModelEdit, useModelRemove, useModels } from '@/features/model/model.hook'
import { useFormContext } from '@/app/edit/[...args]/components/FormContext'
import { BaseOption } from '@components/SearchableSelect/types'

export const ModelSearchable = ({brandId, onChange}: { brandId?: number; onChange: (value: BaseOption) => void }) => {
  const { mode } = useFormContext();
  const {
    isLoading: carModelsLoading,
    data: carModelsData,
    refetch: carModelsRefetch,
    isFetching: carModelsReloading,
  } = useModels(brandId);
  const formikProps = useFormikContext()

  const modelAdd = useModelAdd();
  const modelEdit = useModelEdit();
  const modelDelete = useModelRemove();

  return (
    <Field
      name="model"
      component={SearchableSelect}
      label="Model"
      options={carModelsData}
      isLoading={carModelsLoading}
      disabled={carModelsLoading ||  mode === 'update' || mode === 'add'}
      onValueChange={async (value: BaseOption) => {
        await formikProps.setFieldValue('model', value, false);
        onChange(value);
      }}
      onReload={() => carModelsRefetch()}
      isReloading={carModelsReloading}
      createQueryFn={{ fn: modelAdd, args: { brandId: brandId } }}
      updateQueryFn={modelEdit}
      deleteQueryFn={modelDelete}
    />
  )
}