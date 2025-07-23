import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helpText?: string;
    className?: string;
    containerClassName?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    error,
    helpText,
    className = '',
    containerClassName = '',
    id,
    ...props
}) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={`form-group ${containerClassName}`}>
            {label && (
                <label htmlFor={textareaId} className="form-label">
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={`form-textarea ${error ? 'invalid' : ''} ${className}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${textareaId}-error` : helpText ? `${textareaId}-help` : undefined}
                {...props}
            />
            {error && (
                <span id={`${textareaId}-error`} className="form-error">
                    {error}
                </span>
            )}
            {helpText && !error && (
                <span id={`${textareaId}-help`} className="form-help">
                    {helpText}
                </span>
            )}
        </div>
    );
};

export default FormTextarea;