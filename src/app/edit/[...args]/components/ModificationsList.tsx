'use client';

import React from 'react'
import { ChevronRightIcon, MinusIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

import { Divider } from '@/app/edit/[...args]/components/Divider'
import { useModification } from '@/features/modification/modification.hook'
import { useFormContext } from '@/app/edit/[...args]/components/FormContext'

export const ModificationsList = () => {
  const router = useRouter();
  const {modelId, modificationId} = useFormContext();
  const {
    isLoading: carModificationLoading,
    data: carModificationData
  } = useModification(modelId);

  return (
    <div className="flex flex-col space-y-2">
      {carModificationLoading
        ? Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex flex-col space-y-1 p-2 rounded-md bg-[var(--gray-3)]"
          >
            <div className="h-4 bg-[var(--gray-9)] rounded w-3/4"></div>
            <div className="flex items-center space-x-2">
              <div className="h-3 bg-[var(--gray-9)] rounded w-1/3"></div>
              <span
                className="h-4 w-px bg-[var(--gray-9)]"
                aria-hidden="true"
              ></span>
              <div className="h-3 bg-[var(--gray-9)] rounded w-1/4"></div>
              <span
                className="h-4 w-px bg-[var(--gray-9)]"
                aria-hidden="true"
              ></span>
              <div className="h-3 bg-[var(--gray-9)] rounded w-1/4"></div>
            </div>
          </div>
        ))
        : carModificationData?.map((modification) => (
          <a
            onClick={async (e) => {
              e.preventDefault()
              router.push(`/edit/${modelId}/${modification.id}/update`)
            }}
            href="#"
            key={modification.id}
            className={`block rounded-md p-2 ${Number(modification.id) === modificationId ? 'bg-[var(--accent-3)] dark:bg-[#1b1b1b] hover:bg-[var(--accent-3)]' : 'hover:bg-[var(--gray-4)] dark:hover:bg-[#141414]'}`}
            type="button"
          >
            <div className="flex flex-row flex-1 space-y-1 items-center">
              <div className="flex flex-col flex-1 space-y-1">
                <div className="text-left">
                        <span className="text-lg font-semibold text-[var(--accent-12)] dark:text-gray-300">
                          {modification.name}
                        </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <span>{modification.coupe || <MinusIcon />}</span>
                  <span
                    className="h-4 w-px bg-[var(--gray-9)]"
                    aria-hidden="true"
                  ></span>
                  <span className="flex gap-1 text-center">
                          {modification.weight} kg
                        </span>
                  <span
                    className="h-4 w-px bg-[var(--gray-9)]"
                    aria-hidden="true"
                  ></span>
                  <span className="flex gap-1 text-center">
                          {modification.horsePower} hp
                        </span>
                </div>
              </div>
              <div>{Number(modification.id) === modificationId ? <ChevronRightIcon fontSize={24} /> : null}</div>
            </div>
          </a>
        ))}
      <Divider />
      <div className="py-2 flex flex-1 justify-center">
        <span className="font-sans text-xs">Total of {carModificationData?.length} modifications</span>
      </div>
    </div>
  )
}