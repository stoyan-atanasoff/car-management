import { Column } from '@components/CustomTable/interfaces'

export interface TableProps<T> {
  data: T[];
  isLoading: boolean;
  columns: Column<T>[];
  selectedIds: number[];
  onRowCheck: (ids: number[], value: boolean | string) => void;
  refresh: () => void;
  createEntry?: () => void;
  onDeleteRow?: (id: number) => Promise<void>;
}