'use client';
import { create } from 'zustand'

import { ToastDetails } from '@/features/toasts/types'

type ToastData = Omit<ToastDetails, 'type' | 'id'>;

interface ToastState {
  toasts: ToastDetails[];
  success: (data: ToastData) => void;
  error: (data: ToastData) => void;
  info: (data: ToastData) => void;
  hide: (id: number) => void;
  callback?: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  success: (data) =>
    set((state) => ({
      toasts: [...state.toasts, { ...data, type: 'success', id: Date.now() }],
    })),
  error: (data) =>
    set((state) => ({
      toasts: [...state.toasts, { ...data, type: 'error', id: Date.now() }],
    })),
  info: (data) =>
    set((state) => ({
      toasts: [...state.toasts, { ...data, type: 'info', id: Date.now() }],
    })),
  hide: (id) => {
    /* execude callback */

    return set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },
}))

export default useToastStore;
