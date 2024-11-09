import React from 'react'
import Link from 'next/link'
import { Button } from '@radix-ui/themes'
import { CaretLeftIcon } from '@radix-ui/react-icons'

export const SiderTitle = ({ title }: {title: string}) => {
  return (
    <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Button variant="ghost" size='4' className="cursor-pointer">
            <CaretLeftIcon />
          </Button>
        </Link>
        <span>{title}</span>
      </div>
    </h2>
  )
}