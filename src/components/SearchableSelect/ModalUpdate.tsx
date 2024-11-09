import React from 'react'
import { Button, TextField } from '@radix-ui/themes'

interface ModalUpdateProps {
  value: string;
  onChange: (value: string) => void;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSubmitting: boolean;
  isDeleting: boolean;
}

export const ModalUpdate = ({ value, onChange, onSubmit, onDelete, onClose, isSubmitting, isDeleting }: ModalUpdateProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white dark:bg-black dark:border-[#323232] dark:border p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Manage Value</h2>
        <TextField.Root
          size='2'
          type="text"
          value={value}
          disabled={isSubmitting}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          className="w-full px-3 py-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button
            data-accent-color='red'
            size='2'
            onClick={onDelete}
            variant='surface'
            disabled={isSubmitting || isDeleting}
            loading={isDeleting}
            className='mr-auto'
          >
            Delete
          </Button>
          <div className='flex flex-1'></div>
          <Button
            size='2'
            onClick={onClose}
            variant='outline'
            disabled={isSubmitting || isDeleting}
          >
            Cancel
          </Button>
          <Button
            size='2'
            variant='solid'
            onClick={onSubmit}
            disabled={isSubmitting || isDeleting}
            loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}