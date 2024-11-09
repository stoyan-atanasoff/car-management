import React from 'react'
import { Field, useFormikContext } from 'formik'

import SearchableSelect from '@components/SearchableSelect/SearchableSelect'
import { CarCoupe } from '@lib/_generated/graphql_sdk'

import { BaseOption } from '@components/SearchableSelect/types'

export const CoupeSearchable = ({ onChange }: { onChange: (value: BaseOption) => void }) => {
  const formikProps = useFormikContext();
  return (
    <Field
      name="coupe"
      component={SearchableSelect}
      label="Coupe"
      options={Object.entries(CarCoupe).map(([name, id]) =>({
        id,
        name,
      }))}
      onValueChange={async (value: BaseOption) => {
        await formikProps.setFieldValue('coupe', value, false);
        onChange(value);
      }}
    />
  )
}