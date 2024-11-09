import React from 'react'
import { Button } from '@radix-ui/themes'

interface DeleteConfirmationProps {
  onCancel: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

export const DeleteConfirmation = ({ onCancel, onDelete, isLoading }: DeleteConfirmationProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-start mt-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Delete Confirmation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this entry? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}>
            Cancel
          </Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            className="px-4 py-2 !bg-red-500 text-white rounded hover:!bg-red-600 focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}