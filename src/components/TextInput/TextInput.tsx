import React from 'react';
import { TextField } from '@radix-ui/themes';
import { FieldProps } from 'formik';

import { FormFieldFeedback } from '@components/FormFieldFeedback/FormFieldFeedback'

interface TextInputProps extends FieldProps {
  label: string;
  prefix: string;
  icon: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ field: { onChange, ...field }, form, label, prefix, icon: Icon, onChange: onChangeValue }) => {
  const isError = form.touched[field.name] && form.errors[field.name];

  return (
    <div>
      <label htmlFor={field.name} className="block mb-1 text-gray-700 dark:text-[var(--gray-7)]">
        {label}
      </label>
      <TextField.Root
        size='3'
        id={field.name}
        {...field}
        onChange={(value) => {
          onChange(value);
          if (onChangeValue) {
            onChangeValue(value);
          }
        }}
        aria-invalid={!!isError}
      >
        {Icon && (
          <TextField.Slot>
            <Icon />
          </TextField.Slot>
        )}
        <TextField.Slot>
          {prefix}
        </TextField.Slot>
      </TextField.Root>
      {isError && <FormFieldFeedback>{String(form.errors[field.name])}</FormFieldFeedback>}
    </div>
  );
};
