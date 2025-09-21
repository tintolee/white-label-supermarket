import { useEffect, useReducer } from 'react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
}

interface ToastState {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

const toastState: ToastState = {
    toasts: [],
    addToast: () => { },
    removeToast: () => { }
};

const listeners = new Set<() => void>();
const timeouts = new Map<string, NodeJS.Timeout>();

export function useToast() {
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

    useEffect(() => {
        const listener = () => forceUpdate();
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }, [forceUpdate]);

    return {
        toasts: toastState.toasts,
        addToast: (toast: Omit<Toast, 'id'>) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast = { ...toast, id };
            toastState.toasts = [...toastState.toasts, newToast];
            listeners.forEach(listener => listener());

            const timeoutId = setTimeout(() => {
                toastState.toasts = toastState.toasts.filter(t => t.id !== id);
                timeouts.delete(id);
                listeners.forEach(listener => listener());
            }, toast.duration || 3000);

            timeouts.set(id, timeoutId);
        },
        removeToast: (id: string) => {
            const timeoutId = timeouts.get(id);
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeouts.delete(id);
            }

            toastState.toasts = toastState.toasts.filter(t => t.id !== id);
            listeners.forEach(listener => listener());
        }
    };
}

export type { Toast };