import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary transform hover:scale-105 hover:shadow-medium',
        secondary: 'bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary',
        ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-300',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    };

    const sizeStyles = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {!loading && Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />}
            {children}
            {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" />}
        </button>
    );
};

export default Button;
