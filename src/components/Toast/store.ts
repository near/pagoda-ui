import { type Icon } from '@phosphor-icons/react';
import { create } from 'zustand';

export type ToastType = 'info' | 'error' | 'success';

export type Toast = {
  action?: () => void;
  actionText?: string;
  description?: string;
  duration?: number;
  icon?: Icon;
  id: string;
  isOpen: boolean;
  title?: string;
  type?: ToastType;
};

export type OpenToastOptions = {
  action?: () => void;
  actionText?: string;
  description?: string;
  duration?: number;
  icon?: Icon;
  id?: string;
  title?: string;
  type?: ToastType;
};

type ToasterStore = {
  toasts: Toast[];
  close: (toast: Toast) => void;
  destroy: (toast: Toast) => void;
  open: (options: OpenToastOptions) => void;
};

export const useToasterStore = create<ToasterStore>((set) => ({
  toasts: [],

  close: (toast) => {
    set((state) => {
      const toasts = state.toasts.map((t) => {
        if (t.id === toast.id) {
          return {
            ...t,
            isOpen: false,
          };
        }

        return t;
      });

      setTimeout(() => {
        state.destroy(toast);
      }, 5000);

      return {
        toasts,
      };
    });
  },

  destroy: (toast) => {
    set((state) => {
      const toasts = state.toasts.filter((t) => t.id !== toast.id);

      return {
        toasts,
      };
    });
  },

  open: (options) => {
    const newToast = {
      ...options,
      isOpen: true,
      id: options.id ?? Date.now().toString(),
      type: options.type ?? 'info',
    };

    set((state) => {
      const toasts = state.toasts.filter((t) => t.id !== newToast.id);

      return {
        toasts: [...toasts, newToast],
      };
    });
  },
}));
