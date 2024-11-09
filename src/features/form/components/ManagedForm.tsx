import { FormikProps } from 'formik'
import { ChangeEvent, useEffect } from 'react'
import { Field, Form } from 'formik'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CaretLeftIcon, CubeIcon, InputIcon, PaperPlaneIcon, RocketIcon } from '@radix-ui/react-icons'

import useFormStore from '@/features/form/form.store'
import { BrandSearchable } from '@/features/form/components/ManagedFields/BrandSearchable'
import { TextInput } from '@components/TextInput/TextInput'
import { useFormContext } from '@/app/edit/[...args]/components/FormContext'
import { CarFormValues } from '@/app/edit/[...args]/types'
import { ModelSearchable } from '@/features/form/components/ManagedFields/ModelSearchable'
import { CoupeSearchable } from '@/features/form/components/ManagedFields/CoupeSearchable'

export function ManagedForm(props:FormikProps<CarFormValues>) {
  const router = useRouter();
  const { setFieldValue, setValues, setTouched, values } = props;
  const { mode } = useFormContext();

  const formStore = useFormStore();
  const formValues = formStore.getFormFieldValues();
  const fields = Object.keys(formValues) as (keyof CarFormValues)[];

  useEffect(() => {
    const changes: Partial<CarFormValues> = {};
    const touches: Record<keyof CarFormValues, boolean> = {} as Record<keyof CarFormValues, boolean>;
    fields.forEach((field) => {
      if (formValues[field] !== values[field]) {
        changes[field] = formValues[field] as any;
        touches[field] = false;
      }
    });
    if (Object.keys(changes).length > 0) {
      setTouched(touches, false)
      setValues((prevValues) => ({ ...prevValues, ...changes }), false);
    }
  }, [formValues, setFieldValue, fields, values]);


  useEffect(() => () => formStore.clearFormFieldValues(), [])

  return (
    <Form className="max-w-md mx-auto p-6 rounded-lg space-y-4">
      <Field
        name="name"
        component={TextInput}
        label="Modification name"
        icon={InputIcon}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          formStore.setName(event.target.value);
        }}
      />

      <BrandSearchable
        disabled={mode === 'update' || mode === 'add'}
        onChange={(value) => {
          formStore.setBrand(value);
          formStore.setModel(null);
        }}
      />

      <ModelSearchable
        brandId={formValues.brand?.id}
        onChange={(value) => {
          formStore.setModel(value);
        }}
      />

      <CoupeSearchable
        onChange={(value) => {
          formStore.setCoupe(value);
        }}
      />

      <Field
        name="weight"
        component={TextInput}
        label="Weight"
        prefix="kg"
        icon={CubeIcon}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          formStore.setWeight(event.target.value);
        }}
      />

      <Field
        name="horsepower"
        component={TextInput}
        label="Horsepower"
        prefix="hp"
        icon={RocketIcon}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          formStore.setHorsepower(event.target.value);
        }}
      />

      <div className="flex flex-1 gap-4 mt-4 justify-between items-center">
        <Button
          size="2"
          variant="ghost"
          type="button"
          className="focus:ring-2 focus:ring-offset-2 !mr-auto"
          onClick={() => router.push('/')}
          disabled={props.isSubmitting}
        >
          {!props.isSubmitting && (<CaretLeftIcon />)}
          {props.isSubmitting ? 'Please wait...' : 'Back to list'}
        </Button>
        <Button
          size="2"
          type="submit"
          className="focus:ring-2 focus:ring-offset-2"
          loading={props.isSubmitting}
          disabled={props.isSubmitting}
        >
          <PaperPlaneIcon />
          {mode === 'create' && 'Create'}
          {mode === 'add' && 'Add'}
          {mode === 'update' && 'Update'}
        </Button>
      </div>
    </Form>
  )
}