import type { InputHTMLAttributes, ReactNode } from 'react';
import { X } from 'lucide-react';
import { BORDERS } from '../../lib/styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    clearable?: boolean;
    onClear?: () => void;
}

export default function Input({
    label,
    error,
    helperText,
    startIcon,
    endIcon,
    clearable,
    onClear,
    value,
    className = '',
    id,
    ...props
}: Readonly<InputProps>) {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const hasClearButton = clearable && value && onClear;

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                {startIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {startIcon}
                    </div>
                )}

                <input
                    id={inputId}
                    value={value}
                    className={`w-full ${BORDERS.input} rounded-xl bg-white shadow-sm transition-all duration-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${startIcon ? 'pl-10' : 'pl-3'} ${hasClearButton || endIcon ? 'pr-10' : 'pr-3'} py-2 md:py-3 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
                    {...props}
                />

                {hasClearButton && !endIcon && (
                    <button
                        onClick={onClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-slate-600 transition-colors"
                        aria-label="Clear input"
                        type="button"
                    >
                        <X className="h-5 w-5 text-slate-400" />
                    </button>
                )}

                {endIcon && !hasClearButton && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {endIcon}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {helperText && !error && (
                <p className="text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
}