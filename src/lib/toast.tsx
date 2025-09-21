import { CheckCircle, X, ShoppingCart } from 'lucide-react';
import { useToast } from '../hooks/useToast';

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