import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import { Button, Checkbox, Container, Flex, Skeleton, Table } from '@radix-ui/themes'

import { Filters } from '@components/CustomTable/interfaces'
import { DotFilledIcon } from '@radix-ui/react-icons'
import { TableProps } from '@components/CustomTable/TableProps'
import { TablePagination } from '@components/CustomTable/TablePagination'
import { BaseOption } from '@components/SearchableSelect/types'
import ConfirmationDialog from '@components/ConfirmationDialog/ConfirmationDialog'
import { TableToolbar } from '@components/TableToolbar/TableToolbar'
import { TableColumnHeader } from '@components/CustomTable/TableColumnHeader'

function getNestedValue<T>(obj: T, path: string[]): unknown {
  return path.reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export function CustomTable<T extends BaseOption>({ data, isLoading, columns, selectedIds = [], onRowCheck, refresh, createEntry, onDeleteRow }: TableProps<T>) {
  // Memoize initial filters based on columns to avoid recalculating
  const initialFilters = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.id.toLowerCase()] = '';
      if (column.type === 'number') {
        acc[`${column.id.toLowerCase()}Comparison`] = 'exact';
      }
      return acc;
    }, {} as Filters);
  }, []);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [deleteTargetList, setDeleteTargetList] = useState<number[]|null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteAbort = useRef(false);

  const handleSort = (columnTitle: string) => {
    if (sortColumn === columnTitle) {
      // Toggle sort order between 'asc', 'desc', and clearing sort (null)
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : prevOrder === 'desc' ? null : 'asc'));
      if (sortOrder === 'desc') {
        setSortColumn(null);
        setSortOrder('asc');
      }
    } else {
      // Set new sort column with ascending order
      setSortColumn(columnTitle);
      setSortOrder('asc');
    }
  };

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      return !key.endsWith('Comparison') && value !== '';
    });
  }, [filters]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setPage(1);
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Dynamic filter application based on column configurations
  const applyFilters = (item: T): boolean => {
    return columns.every((column) => {
      const filterValue = filters[column.id.toLowerCase()];
      if (!filterValue || !column?.accessor) return true;

      // Access nested properties based on the `accessor` path
      const fieldValue = column.accessor.split('.').reduce((acc: any, key: string) => acc?.[key], item);

      if (column.type === 'text') {
        return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(filterValue.toLowerCase());
      }

      if (column.type === 'number') {
        const comparisonType = filters[`${column.id.toLowerCase()}Comparison`];
        const filterNum = parseFloat(filterValue);
        if (isNaN(filterNum)) return true;

        switch (comparisonType) {
          case 'greater':
            return fieldValue > filterNum;
          case 'less':
            return fieldValue < filterNum;
          case 'exact':
          default:
            return fieldValue === filterNum;
        }
      }
      return true;
    });
  };

  // Apply dynamic filters to data
  const filteredData = data.filter(applyFilters);
  const sortedData = useMemo(() => {
    if (!filteredData || !sortColumn || !sortOrder) return filteredData;

    const column = columns.find((col) => col.id === sortColumn);
    if (!column) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (!column.accessor) {
        return 0
      }

      const aValue = getNestedValue(a, column.accessor.split('.')) as string | number;
      const bValue = getNestedValue(b, column.accessor.split('.')) as string | number;

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortOrder, columns]);
  const displayedData = sortedData ? sortedData.slice((page - 1) * pageSize, page * pageSize) : [];
  const selectedFiltered = selectedIds.filter(id => filteredData.find(item => item.id === id));

  const handleDeleteSelected = async () => {
    deleteAbort.current = false;
    if (onDeleteRow && deleteTargetList) {
      setDeleteLoading(true);
      const toBeDeleted = deleteTargetList.length;
      let successfullyDeleted = 0;
      for (const id of deleteTargetList) {
        if (!deleteAbort.current) { // Stop deletion if Cancel button is clicked
          try {
            await onDeleteRow(id);
            successfullyDeleted += 1;
          } catch (e) {}
        }
      }
      // if all the deletions are done successfully close the dialog window
      if (successfullyDeleted === toBeDeleted) {
        // switch page to 1 if the current one doesn't exist anymore after deletion
        if (Math.ceil(filteredData.length / pageSize) <= page) {
          setPage(1);
        }
        setDeleteTargetList(null);
      }
      refresh();
      setDeleteLoading(false);
    }
  }

  return (
    <Container>
      {/* Delete modal handling */}
      {deleteTargetList && (
        <ConfirmationDialog
          onConfirm={handleDeleteSelected}
          onCancel={() => {
            deleteAbort.current = true
            setDeleteTargetList(null)
          }}
          loading={deleteLoading}
          okText='Yes, delete!'
          cancelText='Cancel'
        >
          <div className='my-2 text-red-500'>{deleteLoading ? `Deleting ${deleteTargetList.length} items` : "Click \"Yes\" to delete"}:</div>
          <ol>
            {deleteTargetList.map((id) => (
              <li key={id} className='flex items-center'>
                <DotFilledIcon className='mr-2' />{filteredData.find((item) => item.id === id)?.name || String(id)}
              </li>
            ))}
          </ol>
        </ConfirmationDialog>
      )}
      <Flex direction="column" gap="2">
        {/* Toolbar */}
        <TableToolbar
          dataCount={data.length}
          selectedFilteredCount={selectedFiltered.length}
          open={showFilters}
          toggleFilterBar={(state) => setShowFilters(state)}
          hasActiveFilters={hasActiveFilters}
          onClear={() => { setFilters(initialFilters); setPage(1); }}
          selectedCount={selectedIds.length}
          onDeselectAll={() => {
            onRowCheck(selectedIds, false)
          }}
          onDeleteClick={() => { setDeleteTargetList(selectedIds) }}
          onCreateClick={createEntry}
          onRefreshClick={refresh}
        />
        {/* Table */}
        <div className="full-width-wrapper overflow-x-auto">
          <Table.Root
            className={`border border-[var(--gray-5)] rounded-lg w-full`}
            size="1"
          >
            <Table.Header className="bg-[var(--gray-5)]">
              <Table.Row>
                {columns.map((column) => (
                  <Table.ColumnHeaderCell
                    key={column.id}
                    className={`p-4 ${(column.accessor && 'min-w-[150px] w-1/6') || ''}`}
                    onClick={() => handleSort(column.id)}
                  >
                    <TableColumnHeader<T>
                      column={column}
                      sortColumn={sortColumn}
                      sortOrder={sortOrder}
                      checked={
                        displayedData.filter(
                          (item) => selectedFiltered.find((id) => item.id === id)
                        ).length === pageSize
                      }
                      onCheckedChange={(checked) => {
                        onRowCheck(
                          displayedData.map((item) => item.id),
                          checked
                        )
                      }}

                      expanded={showFilters}
                      filters={filters}
                      handleFilterChange={handleFilterChange}
                    />
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {isLoading
                ? Array.from({ length: pageSize }).map((_, index) => (
                    <Table.Row key={index}>
                      {columns.map((column) => (
                        <Table.Cell key={column.id} className="p-4">
                          <Skeleton />
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))
                : displayedData?.map((item, index) => (
                    <Table.Row
                      key={item.id}
                      className={`
                      ${
                        index % 2 === 0
                          ? selectedIds.includes(item.id)
                            ? 'bg-[var(--accent-3)] hover:bg-[var(--accent-4)]'
                            : 'bg-[var(--accent-1)] hover:bg-[var(--accent-3)]'
                          : selectedIds.includes(item.id)
                            ? 'bg-[var(--accent-3)] hover:bg-[var(--accent-4)]'
                            : 'bg-[var(--accent-2)] hover:bg-[var(--accent-3)]'
                      }
                    `}
                    >
                      {columns.map((column) => {
                        if (column.accessor) {
                          const cellValue = getNestedValue(
                            item,
                            column.accessor.split('.')
                          )
                          return (
                            <Table.Cell key={column.id} className="p-4">
                              {column.render?.(cellValue, item) ||
                                (cellValue as string)}
                            </Table.Cell>
                          )
                        } else {
                          if (column.type === 'check') {
                            return (
                              <Table.Cell key={column.id} className="p-4">
                                <Button size="1" variant="ghost">
                                  <Checkbox
                                    checked={selectedIds.indexOf(item.id) > -1}
                                    onCheckedChange={(checked) => {
                                      onRowCheck([item.id], checked)
                                    }}
                                  />
                                </Button>
                              </Table.Cell>
                            )
                          }
                          return (
                            <Table.Cell key={column.id} className="p-4">
                              {column.render?.(null, item, () => {
                                setDeleteTargetList([item.id])
                              })}
                            </Table.Cell>
                          )
                        }
                      })}
                    </Table.Row>
                  ))}
            </Table.Body>
          </Table.Root>
        </div>

        <TablePagination
          count={filteredData?.length}
          total={data?.length}
          loading={isLoading}
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize)
            setPage(1) // Reset to first page when page size changes
          }}
        />
      </Flex>
    </Container>
  )
}