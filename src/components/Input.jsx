import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    helperText,
    icon: Icon,
    required = false,
    className = '',
    ...props
}) => {
    const hasError = !!error;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
            w-full px-4 py-3 pr-10
            ${Icon ? 'pl-11' : ''}
            bg-white border rounded-xl
            text-neutral-800 placeholder-neutral-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-opacity-20
            ${hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-neutral-300 focus:border-primary focus:ring-primary'
                        }
          `}
                    {...props}
                />

                {hasError && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                )}
            </div>

            {/* Error message */}
            {hasError && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                </p>
            )}

            {/* Helper text */}
            {!hasError && helperText && (
                <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
            )}
        </div>
    );
};

export default Input;
