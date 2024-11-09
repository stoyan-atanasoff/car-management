'use client';

import React from 'react'
import { useBrands } from '@/features/brands/brand.hook'
import Link from 'next/link'

export default function Snippet() {
  const { data } = useBrands();
  return (
    <div>
      <Link href='/public'>Back</Link>
      {JSON.stringify(data)}
    </div>
  )
}