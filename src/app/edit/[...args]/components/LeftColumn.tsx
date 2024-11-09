'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CardStackPlusIcon, FilePlusIcon } from '@radix-ui/react-icons'

import { useFormContext } from '@/app/edit/[...args]/components/FormContext'
import { Sider } from '@/app/edit/[...args]/components/Sider'
import { SiderTitle } from '@/app/edit/[...args]/components/SiderTitle'
import { Divider } from '@/app/edit/[...args]/components/Divider'
import { ModificationsList } from '@/app/edit/[...args]/components/ModificationsList'

export const LeftColumn = () => {
  const { mode } = useFormContext();
  const router = useRouter();
  const { modelId } = useFormContext();

  if (mode === 'create') return null;
  return (
    <Sider>
      <SiderTitle title='Car Modifications' />
      <Divider />
      <div className='my-2'>
        <Button asChild className='w-full' onClick={() => { router.push(`/edit/${modelId}/add`)}}>
          <span>
            <CardStackPlusIcon />
            Add New
          </span>
        </Button>
      </div>
      <ModificationsList />
    </Sider>
  );
}