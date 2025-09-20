import { useEffect, useState } from 'react';
import { CheckCircle, X, ShoppingCart } from 'lucide-react';

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
    const [forceUpdate, setForceUpdate] = useState<number>(0);

    useEffect(() => {
        const listener = () => setForceUpdate(prev => prev + 1);
        listeners.add(listener);
        return () => listeners.delete(listener);
    }, []);

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

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    const getBorderColor = (type: string) => {
        if (type === 'success') return 'border-l-4 border-green-500';
        if (type === 'error') return 'border-l-4 border-red-500';
        return 'border-l-4 border-blue-500';
    };

    return (
        <div className="fixed inset-x-4 top-4 z-50 pointer-events-none">
            <div className="flex flex-col items-end space-y-2 max-w-sm ml-auto">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`w-full sm:w-auto sm:min-w-80 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ${getBorderColor(toast.type)}`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {toast.type === 'success' && <CheckCircle className="h-6 w-6 text-green-400" />}
                                    {toast.type === 'info' && <ShoppingCart className="h-6 w-6 text-blue-400" />}
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {toast.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}