import { CarBrand, CarCoupe, CarModel } from '@lib/_generated/graphql_sdk'
import { FormikProps } from 'formik'
import { BaseOption } from '@components/SearchableSelect/types'

export interface CarFormValues {
  name: string;
  brand: BaseOption | null;
  model: BaseOption | null;
  coupe: BaseOption | null;
  weight: string;
  horsepower: string;
}

export const initialValues = {
  name: '',
  brand: null,
  model: null,
  coupe: null,
  weight: '',
  horsepower: '',
};

export type InitialValuesType = typeof initialValues;

export type FormikPropsType = FormikProps<InitialValuesType>;
