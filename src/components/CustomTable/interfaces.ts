import React from 'react'

export interface Column<T> {
  id: string;
  title?: string;
  accessor?: string;
  type?: 'text' | 'number' | "check";
  render?: (value: any, row: T, onDeleteRow?: (id: number) => void) => React.ReactNode; // Optional render function for custom display
}

export type Filters = {
  [key: string]: string;
};
