'use client';

import ModificationsTable from '@/features/modifications-table/ModificationsTable'
import useToastStore from '@/features/toasts/toast.store'

export default function Home() {
  const toastStore = useToastStore();
  return (
    <ModificationsTable />
  )
}