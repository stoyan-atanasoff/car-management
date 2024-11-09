import React from 'react'

import { FieldInputProps, FormikProps } from 'formik';
import { CarFormValues } from '@/app/edit/[...args]/types'

interface InputTextProps {
  field: FieldInputProps<string>;
  form: FormikProps<CarFormValues>;
  label: string;
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({ field, form: { touched, errors }, label, placeholder }) => {
  const error = touched[field.name as keyof CarFormValues] && errors[field.name as keyof CarFormValues];
  return (
    <div>
      <label htmlFor={field.name} className="block mb-1 text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type="text"
        {...field}
        placeholder={placeholder}
        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && (
        <div className="mt-1 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

export default InputText;
