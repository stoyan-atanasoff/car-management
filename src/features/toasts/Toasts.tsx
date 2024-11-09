import * as Toast from "@radix-ui/react-toast";

import useToastStore from '@/features/toasts/toast.store';

import "./styles.css";

export const Toasts = () => {
  const toastStore = useToastStore();

  if (toastStore.toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {toastStore.toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          className={`toast-root ${toast.type}`}
          open={true}
          onOpenChange={() => toastStore.hide(toast.id)}
        >
          <Toast.Title className="toast-title">{toast.title}</Toast.Title>
          <Toast.Description asChild>
            <p className="toast-message">{toast.message}</p>
          </Toast.Description>
        </Toast.Root>
      ))}
    </div>
  );
};
