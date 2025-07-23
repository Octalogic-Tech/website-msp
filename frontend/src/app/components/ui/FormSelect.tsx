import React from 'react';

interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    options: Option[];
    error?: string;
    helpText?: string;
    className?: string;
    containerClassName?: string;
    onChange?: (value: string) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    options,
    error,
    helpText,
    className = '',
    containerClassName = '',
    id,
    onChange,
    ...props
}) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={`form-group ${containerClassName}`}>
            {label && (
                <label htmlFor={selectId} className="form-label">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`form-select ${error ? 'invalid' : ''} ${className}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${selectId}-error` : helpText ? `${selectId}-help` : undefined}
                onChange={handleChange}
                {...props}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <span id={`${selectId}-error`} className="form-error">
                    {error}
                </span>
            )}
            {helpText && !error && (
                <span id={`${selectId}-help`} className="form-help">
                    {helpText}
                </span>
            )}
        </div>
    );
};

export default FormSelect;