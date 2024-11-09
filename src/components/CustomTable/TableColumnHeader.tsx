import React from 'react'
import { Checkbox, TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Column, Filters } from '@components/CustomTable/interfaces'

interface TableColumnHeaderProps<T> {
  column: Column<T>;
  sortColumn: string | null;
  sortOrder: string | null;
  checked: boolean;
  expanded: boolean;
  filters: Filters;
  handleFilterChange: (e: any) => void;
  onCheckedChange: (value: boolean) => void;
}

export function TableColumnHeader<T>({
                                       column,
                                       sortColumn,
                                       sortOrder,
                                       checked,
                                       expanded,
                                       filters,
                                       onCheckedChange,
                                       handleFilterChange,
                                     }: TableColumnHeaderProps<T>) {
  return (
    <>
      {column.type === 'check' ? (
        <div
          className="mt-2"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </div>
      ) : (
        <span>{column.title}</span>
      )}
      {sortColumn === column.id && column.id !== 'check' && (
        <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
      )}
      {expanded && (
        <>
          {column.type === 'number' && (
            <div className="flex mt-2 space-x-2">
              <select
                name={`${column.id.toLowerCase()}Comparison`}
                value={filters[`${column.id.toLowerCase()}Comparison`]}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onChange={handleFilterChange}
                className="p-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="exact">=</option>
                <option value="greater">&gt;</option>
                <option value="less">&lt;</option>
              </select>
              <TextField.Root
                type="number"
                name={column.id.toLowerCase()}
                value={filters[column.id.toLowerCase()]}
                onChange={handleFilterChange}
                placeholder={`Filter by ${column.id.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </div>
          )}
          {column.type === 'text' && (
            <TextField.Root
              type="search"
              name={column.id.toLowerCase()}
              value={filters[column.id.toLowerCase()]}
              onChange={handleFilterChange}
              placeholder={`Filter by ${column.id.toLowerCase()}`}
              className="mt-2"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        </>
      )}
    </>
  )
}