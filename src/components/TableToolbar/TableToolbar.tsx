import React from 'react'
import { Button } from '@radix-ui/themes'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
  GroupIcon,
  PlusCircledIcon,
  ReloadIcon,
} from '@radix-ui/react-icons'

interface TableToolbarProps {
  dataCount: number;
  selectedFilteredCount: number;
  open: boolean
  toggleFilterBar: (value: boolean) => void
  hasActiveFilters: boolean
  onClear: () => void
  selectedCount: number;
  onDeselectAll: () => void;
  onDeleteClick: () => void
  onCreateClick?: () => void
  onRefreshClick?: () => void
}

export const TableToolbar = ({
   dataCount,
   selectedFilteredCount,
   open,
   toggleFilterBar,
   hasActiveFilters,
   onClear,
   selectedCount,
   onDeselectAll,
   onDeleteClick,
   onCreateClick,
   onRefreshClick,
 }: TableToolbarProps) => {
  return (
    <div className="flex flex-row gap-2 flex-1 mt-2">
      <div className="flex flex-row gap-3 flex-1">
        <Button
          size="2"
          variant="ghost"
          onClick={() => toggleFilterBar(!open)}
        >
          {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {open ? 'Hide' : 'Show'} filters
        </Button>
        {hasActiveFilters && (
          <Button
            size="2"
            variant="ghost"
            onClick={() => {
              onClear()
              toggleFilterBar(false)
            }}
          >
            <Cross2Icon />
            <span className="hidden sm:inline">
              Clear Filters
            </span>
          </Button>
          )}
        {selectedCount > 0 && (
          <>
            <Button
              size="2"
              variant="ghost"
              onClick={onDeselectAll}
            >
              <GroupIcon />
              <span className="hidden sm:inline">
                Deselect All
              </span>
            </Button>
            {onDeleteClick && selectedFilteredCount > 0 && (
              <Button
                size="2"
                variant="ghost"
                onClick={onDeleteClick}
                className="!text-red-500 hover:!bg-red-500 hover:!text-white"
              >
                <Cross2Icon />
                <span className='hidden sm:inline'>
                  Delete selected ({selectedFilteredCount})
                </span>
              </Button>
            )}
          </>
        )}
      </div>
      <div className="flex flex-row flex-1 justify-center items-center">
        {selectedCount > 0 && (
          <span className="text-[var(--accent-11)] text-xs">
            Selected {selectedFilteredCount} of {dataCount} items
          </span>
        )}
      </div>
      <div className="flex flex-1 gap-2 justify-end">
        {onCreateClick && (
          <Button
            size="2"
            variant="ghost"
            onClick={() => {
              onCreateClick()
            }}
          >
            <PlusCircledIcon />
            <span className="hidden sm:flex sm:items-center">
              Create Modification
            </span>
          </Button>
          )}
        {onRefreshClick && (
          <Button
            size="2"
            variant="ghost"
            onClick={() => {
              onRefreshClick()
            }}
          >
            <ReloadIcon />
            <span className='hidden sm:inline'>
              Refresh
            </span>
          </Button>
          )}
      </div>
    </div>
)
}