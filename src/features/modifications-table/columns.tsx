import React from 'react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Button, DropdownMenu, Tooltip } from '@radix-ui/themes'
import { Cross2Icon, Pencil2Icon, RowsIcon } from '@radix-ui/react-icons'

import { Column } from '@components/CustomTable/interfaces'
import CarTypeConvertible from '@components/Icons/CarTypeConvertible'
import CarTypeVan from '@components/Icons/CarTypeVan'
import CarTypeSedan from '@components/Icons/CarTypeSedan'
import CarTypeTruck from '@components/Icons/CarTypeTruck'
import CarTypeCoupe from '@components/Icons/CarTypeCoupe'
import CarTypeSuv from '@components/Icons/CarTypeSuv'
import CarTypeWagon from '@components/Icons/CarTypeWagon'
import CarTypeHatchback from '@components/Icons/CarTypeHatchback'
import { CarModificationFix } from '@/features/modification/types'

export const getColumns = (
  router: AppRouterInstance,
  onDeleteRow: (id: number) => Promise<void>
): Column<CarModificationFix>[] => [
  {
    id: 'check',
    title: '#',
    type: 'check',
  },
  {
    id: 'brand',
    title: 'Brand',
    accessor: 'model.brand.name',
    type: 'text',
    render: (value, row) => (
      <>
        {row.id} {value}
      </>
    ),
  },
  {
    id: 'model',
    title: 'Model',
    accessor: 'model.name',
    type: 'text',
  },
  {
    id: 'name',
    title: 'Name',
    accessor: 'name',
    type: 'text',
  },
  {
    id: 'coupe',
    title: 'Coupe',
    accessor: 'coupe',
    type: 'text',
    render: (value) => (
      <div>
        <Tooltip
          side="right"
          align="center"
          className="bg-gray-700 rounded p-2"
          content={
            <div>
              {value === 'CONVERTIBLE' && (
                <CarTypeConvertible width={36} height={36} />
              )}
              {value === 'VAN' && <CarTypeVan width={36} height={36} />}
              {value === 'SEDAN' && <CarTypeSedan width={36} height={36} />}
              {value === 'TRUCK' && <CarTypeTruck width={36} height={36} />}
              {value === 'COUPE' && <CarTypeCoupe width={36} height={36} />}
              {value === 'SUV' && <CarTypeSuv width={36} height={36} />}
              {value === 'WAGON' && <CarTypeWagon width={36} height={36} />}
              {value === 'HATCHBACK' && (
                <CarTypeHatchback width={36} height={36} />
              )}
            </div>}
          >
            <span className="cursor-default">{value}</span>
        </Tooltip>
      </div>
    ),
  },
  {
    id: 'weight',
    title: 'Weight',
    accessor: 'weight',
    type: 'number',
    render: (value) => (
      <div className="text-right">
        <Tooltip
          side="right"
          align="center"
          className="bg-gray-700 text-white dark:text-black p-2 rounded"
          content={
            <div>{`${(value * 2.205).toFixed(2)} lbs`}</div>
          }
        >
          <span>{value} kg</span>
        </Tooltip>
      </div>
    ),
  },
  {
    id: 'horsepower',
    title: 'Horsepower',
    accessor: 'horsePower',
    type: 'number',
    render: (value) => (
      <div className="text-right">
        <Tooltip
          side='left'
          align='center'
          className="bg-gray-700 text-white p-2 rounded"
          content={
            <div>
              {`${(value * 0.7355).toFixed(2)} kW`}
            </div>
          }
        >
          <span>{value} hp</span>
        </Tooltip>
      </div>
    ),
  },
  {
    id: 'ctrl',
    title: '#',
    render: (_, row, onDelete) => (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">
            <RowsIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onClick={() =>
              router.push(
                `/edit/${row.model.id}?name=${row.name}&coupe=${row.coupe}&weight=${row.weight}&horsePower=${row.horsePower}`
              )
            }
          >
            <Pencil2Icon />
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          {onDelete && (
            <DropdownMenu.Item color="red" onClick={() => onDelete(row.id)}>
              <Cross2Icon />
              Delete
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
  },
]
