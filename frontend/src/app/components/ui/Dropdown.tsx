import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
    value: string;
    label: string;
    disabled?: boolean;
}

interface DropdownProps {
    items: DropdownItem[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    items,
    value,
    placeholder = 'Select an option',
    onChange,
    className = '',
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedItem = items.find(item => item.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (itemValue: string) => {
        if (onChange) {
            onChange(itemValue);
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div ref={dropdownRef} className={`dropdown ${className}`}>
            <button
                className={`dropdown-trigger ${disabled ? 'disabled' : ''}`}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selectedItem ? selectedItem.label : placeholder}</span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {isOpen && (
                <div className="dropdown-menu" role="listbox">
                    {items.map((item) => (
                        <button
                            key={item.value}
                            className={`dropdown-item ${value === item.value ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                            onClick={() => !item.disabled && handleSelect(item.value)}
                            disabled={item.disabled}
                            role="option"
                            aria-selected={value === item.value}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;