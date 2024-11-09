import React from 'react'
import { TabNav } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import { useModification, useModificationRemove } from '@/features/modification/modification.hook'
import { useFormContext } from '@/app/edit/[...args]/components/FormContext'
import { CustomForm } from '@/features/form/CustomForm'
import { DeleteConfirmation } from '@/app/edit/[...args]/components/DeleteConfirmation'

export const FormManager = () => {
  const { modelId, mode, modificationId } = useFormContext();
  const router = useRouter();
  const { data } = useModification(modelId);
  const modificationRemove = useModificationRemove();

  if (mode === 'update' && !modificationId && data && data.length > 0) {
    router.push(`/edit/${modelId}/${data[0].id}/update`)
  }

  const handleDelete = async () => {
    await modificationRemove.mutateAsync({ id: String(modificationId) });
    if (data && data.length === 1) {
      router.push(`/`);
    } else {
      router.push(`/edit/${modelId}`);
    }
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col bg-[var(--gray-2)] h-full shadow-none p-4">
        <TabNav.Root>
          {mode === 'create' && (
            <TabNav.Link href="#" active>Create new</TabNav.Link>
          )}
          {(mode === 'update' || mode === 'delete') && (
            <>
            <TabNav.Link
              href="#"
              active={mode === 'update'}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/edit/${modelId}/${modificationId}/update`);
              }}
            >
              Update
            </TabNav.Link>

            <TabNav.Link
              href="#"
              active={mode === 'delete'}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/edit/${modelId}/${modificationId}/delete`);
              }}
            >
              Delete current
            </TabNav.Link>
            </>
          )}
          {mode === 'add' && (
            <TabNav.Link
              href="#"
              active
              onClick={() => {
                router.push(`/edit/${modelId}/add`);
              }}
            >
              Add new
            </TabNav.Link>
          )}
        </TabNav.Root>
        {(mode !== 'delete') && (
          <CustomForm />
        )}
        {mode === 'delete' && (
          <DeleteConfirmation
            isLoading={modificationRemove.isPending}
            onCancel={() => {
              router.push(`/edit/${modelId}/${modificationId}/update`)
            }}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}