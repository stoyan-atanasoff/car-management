import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

export const NoResults = ({ onCreateClick, isLoading, visible, }: { visible: boolean; onCreateClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; isLoading?: boolean; }) => {
  return (
    <div className="flex flex-1 flex-row justify-between p-2 items-center">
      <div className="text-sm text-gray-500">No results found</div>
      {visible && (
        <Button size="2" variant="surface" onClick={onCreateClick} loading={onCreateClick && isLoading} disabled={onCreateClick && isLoading}>
          <PlusIcon />Create
        </Button>
      )}
    </div>
  )
}