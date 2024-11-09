export type ToastDetails = {
  id: number;
  title: string;
  message: string;
  type: 'error' | 'success' | 'info';
}