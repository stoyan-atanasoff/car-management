import { Field, Formik, FormikProps, useFormik, useFormikContext } from 'formik'
import SearchableSelect from '@components/SearchableSelect/SearchableSelect'
import { CarBrand } from '@lib/_generated/graphql_sdk'
import React from 'react'
import { useBrandAdd, useBrandDelete, useBrandEdit, useBrands } from '@/features/brands/brand.hook'
import { BaseOption } from '@components/SearchableSelect/types'

export const BrandSearchable = ({ disabled, onChange }: { disabled: boolean, onChange: (value: BaseOption) => void }) => {
  const {
    isLoading: carBrandsLoading,
    data: carBrandsData,
    refetch: carBrandsRefetch,
    isFetching: carBrandsReloading,
  } = useBrands();
  const formikProps = useFormikContext()

  const brandAdd = useBrandAdd();
  const brandEdit = useBrandEdit();
  const brandDelete = useBrandDelete();

  return (
    <Field
      name="brand"
      component={SearchableSelect}
      label="Brand"
      options={carBrandsData}
      isLoading={carBrandsLoading}
      disabled={carBrandsLoading || disabled}
      onValueChange={async (value: BaseOption) => {
        await formikProps.setFieldValue('brand', value, false);
        await formikProps.setFieldValue('model', null, false);
        onChange(value)
      }}
      onReload={() => carBrandsRefetch()}
      isReloading={carBrandsReloading}
      createQueryFn={brandAdd}
      updateQueryFn={brandEdit}
      deleteQueryFn={brandDelete}
    />
  )
}