import React, { useState, createContext, useContext } from 'react';

interface AccordionContextType {
    openItems: string[];
    toggleItem: (id: string) => void;
    isItemOpen: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
    children: React.ReactNode;
    defaultOpenItems?: string[];
    allowMultiple?: boolean;
    className?: string;
}

interface AccordionItemProps {
    id: string;
    title: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const Accordion: React.FC<AccordionProps> & {
    Item: React.FC<AccordionItemProps>;
} = ({
    children,
    defaultOpenItems = [],
    allowMultiple = false,
    className = ''
}) => {
        const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

        const toggleItem = (id: string) => {
            setOpenItems(prevOpenItems => {
                if (prevOpenItems.includes(id)) {
                    return prevOpenItems.filter(item => item !== id);
                } else {
                    return allowMultiple ? [...prevOpenItems, id] : [id];
                }
            });
        };

        const isItemOpen = (id: string) => {
            return openItems.includes(id);
        };

        return (
            <AccordionContext.Provider value={{ openItems, toggleItem, isItemOpen }}>
                <div className={`accordion ${className}`} role="presentation">
                    {children}
                </div>
            </AccordionContext.Provider>
        );
    };

const AccordionItem: React.FC<AccordionItemProps> = ({
    id,
    title,
    children,
    className = '',
    disabled = false
}) => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('AccordionItem must be used within an Accordion');
    }

    const { toggleItem, isItemOpen } = context;
    const isOpen = isItemOpen(id);
    const itemId = `accordion-item-${id}`;
    const contentId = `accordion-content-${id}`;

    const handleToggle = () => {
        if (!disabled) {
            toggleItem(id);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    };

    return (
        <div className={`accordion-item ${className} ${isOpen ? 'expanded' : ''} ${disabled ? 'disabled' : ''}`}>
            <button
                id={itemId}
                className={`accordion-trigger ${isOpen ? 'active' : ''}`}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-controls={contentId}
                disabled={disabled}
            >
                <span className="accordion-title">{title}</span>
                <span className="accordion-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <div
                    id={contentId}
                    className="accordion-content"
                    role="region"
                    aria-labelledby={itemId}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

Accordion.Item = AccordionItem;

export default Accordion;