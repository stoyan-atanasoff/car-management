import React, { useEffect, useRef } from 'react'
import { Formik, FormikErrors, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'

import { CarCoupe } from '@lib/_generated/graphql_sdk'
import useFormStore from '@/features/form/form.store'
import { useModification, useModificationAdd, useModificationEdit } from '@/features/modification/modification.hook'
import { CarFormValues } from '@/app/edit/[...args]/types'
import { CoupeType } from '@/types/CoupeType'
import { useFormContext } from '@/app/edit/[...args]/components/FormContext'
import { BaseOption } from '@components/SearchableSelect/types'
import { CustomErrorExtension, CustomErrorResponse, isCustomErrorExtension } from '@/types/CustomErrorResponse'
import { ManagedForm } from './components/ManagedForm'

export const CustomForm = () => {
  const router = useRouter();
  const { modelId, mode, modificationId } = useFormContext();
  const { data: carModificationData } = useModification(modelId);
  const modificationEdit = useModificationEdit();
  const modificationAdd = useModificationAdd();

  const formikRef = useRef<FormikProps<CarFormValues> | null>(null);

  const validate = (values: CarFormValues) => {
    const errors: FormikErrors<CarFormValues> = {};
    if (!values.name.length) errors.name = "Modification name is required";
    if (!values.brand) errors.brand = "Brand is required";
    if (!values.model) errors.model = "Model is required";
    if (!values.coupe) errors.coupe = "Coupe is required";
    if (values.weight.length === 0) errors.weight = "Weight is required";
    if (Number.isNaN(parseInt(values.weight, 10))) errors.weight = "Only numbers are allowed";
    if (values.horsepower.length === 0) errors.horsepower = "Horsepower is required";
    if (Number.isNaN(parseInt(values.horsepower, 10))) errors.horsepower = "Only numbers are allowed";
    return errors;
  };

  const onSubmit = async (values: CarFormValues) => {
    if (mode === 'update' && modificationId && values.coupe) {
      await modificationEdit.mutateAsync({
        coupe: values.coupe.id as unknown as CarCoupe,
        horsePower: Number(values.horsepower),
        id: String(modificationId),
        name: values.name,
        weight: Number(values.weight),
      }).catch(async (err) => {
        const error = err as CustomErrorResponse;
        if (formikRef.current) {
          formikRef.current.setErrors(
            (error.response.errors.filter(isCustomErrorExtension) as CustomErrorExtension[])
            .reduce((acc, err) => ({ ...acc, [err.extensions!.field.toLowerCase()]: err.message }), {})
          );
        }
      });
    }
    if ((mode === 'add' || mode === 'create') && values.model?.id && values.coupe) {
      await modificationAdd.mutateAsync({
        modelId: String(values.model.id),
        name: values.name,
        coupe: values.coupe.id as unknown as CarCoupe,
        horsePower: values.horsepower,
        weight: values.weight,
      }).then((response) => {
        router.push(`/edit/${response.model.id}/${response.id}/update`);
      }).catch(async (err) => {
        const error = err as CustomErrorResponse;
        if (formikRef.current) {
          formikRef.current.setErrors(
            (error.response.errors.filter(isCustomErrorExtension) as CustomErrorExtension[])
            .reduce((acc, err) => ({ ...acc, [err.extensions!.field.toLowerCase()]: err.message }), {})
          );
        }
      });
    }
  }

  useEffect(() => {
    if (mode === 'update') {
      const modification = carModificationData?.find((m) => Number(m.id) === modificationId);
      if (modification) {
        formStore.setFormFieldValues({
          name: modification.name,
          brand: (modification.model.brand || null) as unknown as BaseOption,
          model: (modification.model || null) as unknown as BaseOption,
          coupe: (modification.coupe ? {
            id: modification.coupe,
            name: CoupeType[modification.coupe]
          } : null) as unknown as BaseOption,
          weight: modification.weight.toString(),
          horsepower: modification.horsePower.toString(),
        });
      }
    } else if (mode === 'add') {
      const modification = carModificationData?.[0];
      if (modification) {
        formStore.setFormFieldValues({
          name: '',
          brand: (modification.model.brand || null) as unknown as BaseOption,
          model: (modification.model || null) as unknown as BaseOption,
          coupe: null,
          weight: '',
          horsepower: '',
        });
      }
    }
  }, [mode, modificationId, carModificationData])

  const formStore = useFormStore();
  const initialValues = {
    name: formStore.name,
    brand: formStore.brand,
    model: formStore.model || null,
    coupe: formStore.coupe || null,
    weight: '',
    horsepower: '',
  }

  return (
    <Formik
      innerRef={(x) => {
        formikRef.current = x
      }}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(props) => <ManagedForm {...props} />}
    </Formik>
  )
}
