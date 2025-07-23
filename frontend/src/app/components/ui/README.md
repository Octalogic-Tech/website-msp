# ConstructPro UI Component Library

This directory contains the UI component library for the ConstructPro website. These components are built using the design system defined in `src/app/styles/design-system.css`.

## Available Components

### Layout Components
- **Card**: Container for content with optional header and footer
- **Modal**: Dialog box for focused interactions

### Form Components
- **Button**: Interactive button with multiple variants and states
- **FormInput**: Text input field with label and validation
- **FormSelect**: Dropdown select with label and validation
- **FormTextarea**: Multi-line text input with label and validation
- **Dropdown**: Enhanced dropdown menu with keyboard navigation

### Navigation Components
- **Breadcrumb**: Path-based navigation showing current location
- **Pagination**: Navigation between pages of content
- **Tabs**: Tabbed interface for switching between content sections

### Feedback Components
- **Alert**: Persistent messages for important information
- **Badge**: Status indicators and tags
- **Toast**: Temporary notifications for user feedback
- **Loading**: Loading indicators with different sizes
- **Skeleton**: Loading placeholders for content

### Content Components
- **Accordion**: Collapsible content sections

## Usage

Import components from the UI components directory:

```tsx
import { Button, Card, Alert } from '@/app/components/ui';

// Example usage
<Button variant="primary" size="lg">Click Me</Button>

<Card>
  <Card.Header>Card Title</Card.Header>
  <Card.Body>Card content goes here</Card.Body>
  <Card.Footer>Card footer</Card.Footer>
</Card>

<Alert variant="success" title="Success">
  Operation completed successfully
</Alert>
```

## Component Props

### Button

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  // Plus all standard button attributes
}
```

### Card

```tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'primary';
  className?: string;
  children: React.ReactNode;
}

// Card also has Header, Body, and Footer sub-components
<Card.Header>Header Content</Card.Header>
<Card.Body>Body Content</Card.Body>
<Card.Footer>Footer Content</Card.Footer>
```

### Alert

```tsx
interface AlertProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}
```

### FormInput

```tsx
interface FormInputProps {
  label?: string;
  error?: string;
  helpText?: string;
  className?: string;
  containerClassName?: string;
  // Plus all standard input attributes
}
```

### FormSelect

```tsx
interface FormSelectProps {
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  error?: string;
  helpText?: string;
  className?: string;
  containerClassName?: string;
  onChange?: (value: string) => void;
  // Plus all standard select attributes except onChange
}
```

### Tabs

```tsx
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
}

// Tabs has List, Trigger, and Content sub-components
<Tabs.List>Tab navigation</Tabs.List>
<Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
<Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
```

### Accordion

```tsx
interface AccordionProps {
  children: React.ReactNode;
  defaultOpenItems?: string[];
  allowMultiple?: boolean;
  className?: string;
}

// Accordion has Item sub-component
<Accordion.Item id="item1" title="Item Title">
  Item content
</Accordion.Item>
```

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Support for reduced motion preferences
- High contrast mode support

## Customization

Components can be customized using the `className` prop, which accepts additional CSS classes.

For more information about the design system, see the [Style Guide](../../styles/STYLE_GUIDE.md).