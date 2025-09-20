import { ButtonHTMLAttributes, ReactNode } from 'react';
import { GRADIENTS, SHADOWS, TRANSFORMS } from '../../lib/styles';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'pill';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    isLoading?: boolean;
    active?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
    primary: `${GRADIENTS.primary} text-white ${GRADIENTS.primaryHover} ${SHADOWS.button}`,
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    ghost: 'bg-transparent text-gray-300 hover:text-white',
    pill: '' // Will be handled separately based on active state
};

const buttonSizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
};

export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    isLoading = false,
    active = false,
    className = '',
    disabled,
    ...props
}: Readonly<ButtonProps>) {

    const getVariantClasses = () => {
        if (variant === 'pill') {
            return active
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
        return buttonVariants[variant];
    };

    const borderRadius = variant === 'pill' ? 'rounded-full' : 'rounded-xl';
    const baseClasses = `${borderRadius} font-medium transition-all duration-200 ${TRANSFORMS.buttonHover} disabled:opacity-50 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-blue-500`;

    return (
        <button
            className={`${baseClasses} ${getVariantClasses()} ${buttonSizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading...
                </div>
            ) : (
                children
            )}
        </button>
    );
}