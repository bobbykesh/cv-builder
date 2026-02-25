import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: unknown;
}

interface ToastState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface UIState {
  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;

  // Modal
  modal: ModalState;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;

  // Toasts
  toasts: ToastState[];
  addToast: (toast: Omit<ToastState, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Preview mode
  isPreviewMode: boolean;
  setPreviewMode: (isPreview: boolean) => void;
  togglePreviewMode: () => void;

  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (isLoading: boolean) => void;

  // Template preview
  previewTemplate: string | null;
  setPreviewTemplate: (templateId: string | null) => void;

  // Color picker
  isColorPickerOpen: boolean;
  setColorPickerOpen: (isOpen: boolean) => void;

  // Export modal
  isExportModalOpen: boolean;
  setExportModalOpen: (isOpen: boolean) => void;

  // Confirmation dialog
  confirmDialog: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
    onCancel: (() => void) | null;
  };
  showConfirmDialog: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  hideConfirmDialog: () => void;
}

const generateToastId = (): string => {
  return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useUIStore = create<UIState>((set, get) => ({
  // Sidebar
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  // Modal
  modal: { isOpen: false, type: null, data: undefined },
  openModal: (type, data) => set({ modal: { isOpen: true, type, data } }),
  closeModal: () => set({ modal: { isOpen: false, type: null, data: undefined } }),

  // Toasts
  toasts: [],
  addToast: (toast) => {
    const id = generateToastId();
    const newToast: ToastState = { ...toast, id };
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  clearToasts: () => set({ toasts: [] }),

  // Preview mode
  isPreviewMode: false,
  setPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),
  togglePreviewMode: () =>
    set((state) => ({ isPreviewMode: !state.isPreviewMode })),

  // Loading states
  globalLoading: false,
  setGlobalLoading: (isLoading) => set({ globalLoading: isLoading }),

  // Template preview
  previewTemplate: null,
  setPreviewTemplate: (templateId) => set({ previewTemplate: templateId }),

  // Color picker
  isColorPickerOpen: false,
  setColorPickerOpen: (isOpen) => set({ isColorPickerOpen: isOpen }),

  // Export modal
  isExportModalOpen: false,
  setExportModalOpen: (isOpen) => set({ isExportModalOpen: isOpen }),

  // Confirmation dialog
  confirmDialog: {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
  },
  showConfirmDialog: (title, message, onConfirm, onCancel) =>
    set({
      confirmDialog: {
        isOpen: true,
        title,
        message,
        onConfirm,
        onCancel: onCancel || null,
      },
    }),
  hideConfirmDialog: () =>
    set({
      confirmDialog: {
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null,
      },
    }),
}));
