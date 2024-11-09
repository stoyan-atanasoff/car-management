'use client';

import React from 'react'
import { CustomTable } from '@components/CustomTable/CustomTable'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { getColumns } from '@/features/modifications-table/columns'
import { useAllModifications, useModificationRemove } from '@/features/modification/modification.hook'
import { CarModificationFix } from '@/features/modification/types'
import useModificationsTableStore from '@/features/modifications-table/modifications-table.store'

const ModificationsTable = () => {
  const { data, isLoading, isFetching, refetch } = useAllModifications();
  const queryClient = useQueryClient();
  const router = useRouter();
  const modificationRemove = useModificationRemove();
  const modificationsTableStore = useModificationsTableStore();

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onRowCheck = (id: number[], value: string | boolean) => {
    if (value) {
      modificationsTableStore.selectRows(id);
    } else {
      modificationsTableStore.deselectRows(id);
    }
  }

  const refreshTable = async () => {
    await queryClient.invalidateQueries({ queryKey: ['modifications'] });
    await refetch();
  }

  const onDeleteRow = async (id: number, triggerTableRefresh?: boolean) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await modificationRemove.mutateAsync({ id: String(id), invalidateCache: triggerTableRefresh }).then(() => {
          modificationsTableStore.deselectRows([id]);
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <CustomTable<CarModificationFix>
      data={data || []}
      isLoading={isLoading || isFetching}
      columns={getColumns(router, onDeleteRow)}
      onRowCheck={onRowCheck}
      selectedIds={modificationsTableStore.selectedRows}
      refresh={refreshTable}
      createEntry={() => router.push('/edit/create')}
      onDeleteRow={onDeleteRow}
    />
  )
}

export default ModificationsTable;
