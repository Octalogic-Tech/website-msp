import React, { useState, createContext, useContext } from 'react';

interface TabsContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
    defaultValue: string;
    children: React.ReactNode;
    className?: string;
    onChange?: (value: string) => void;
}

interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

const Tabs: React.FC<TabsProps> & {
    List: React.FC<TabsListProps>;
    Trigger: React.FC<TabsTriggerProps>;
    Content: React.FC<TabsContentProps>;
} = ({ defaultValue, children, className = '', onChange }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (onChange) {
            onChange(tab);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
            <div className={`tabs ${className}`}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
    return (
        <div className={`tabs-list ${className}`} role="tablist">
            {children}
        </div>
    );
};

const TabsTrigger: React.FC<TabsTriggerProps> = ({
    value,
    children,
    disabled = false,
    className = ''
}) => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabsTrigger must be used within Tabs');
    }

    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;

    const handleClick = () => {
        if (!disabled) {
            setActiveTab(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <button
            className={`tabs-trigger ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''} ${className}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${value}`}
            id={`tab-${value}`}
        >
            {children}
        </button>
    );
};

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabsContent must be used within Tabs');
    }

    const { activeTab } = context;
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
        <div
            className={`tabs-content ${className}`}
            role="tabpanel"
            id={`tabpanel-${value}`}
            aria-labelledby={`tab-${value}`}
        >
            {children}
        </div>
    );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;