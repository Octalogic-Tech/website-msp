import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
    className?: string;
    containerClassName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    helpText,
    className = '',
    containerClassName = '',
    id,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={`form-group ${containerClassName}`}>
            {label && (
                <label htmlFor={inputId} className="form-label">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`form-input ${error ? 'invalid' : ''} ${className}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
                {...props}
            />
            {error && (
                <span id={`${inputId}-error`} className="form-error">
                    {error}
                </span>
            )}
            {helpText && !error && (
                <span id={`${inputId}-help`} className="form-help">
                    {helpText}
                </span>
            )}
        </div>
    );
};

export default FormInput;