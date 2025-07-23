# Design System Quick Start Guide

This guide provides a quick introduction to using the ConstructPro design system in your components.

## Getting Started

### 1. Import the Design System

To use the design system in your component, import the CSS file:

```tsx
import '../styles/design-system.css';
```

### 2. Use Design Tokens

Use CSS variables for consistent styling:

```css
.my-component {
  color: var(--primary-color);
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

### 3. Import UI Components

Import pre-built components from the UI library:

```tsx
import { Button, Card, Alert } from '@/app/components/ui';
```

## Common Patterns

### Page Layout

```tsx
'use client';

import React from 'react';
import { Breadcrumb } from '@/app/components/ui';

export default function MyPage() {
  return (
    <div className="page-container">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Current Page' }
        ]}
      />
      
      <h1 className="heading-1">Page Title</h1>
      
      <div className="content-section">
        {/* Page content */}
      </div>
    </div>
  );
}
```

### Form Layout

```tsx
import { FormInput, FormSelect, FormTextarea, Button } from '@/app/components/ui';

function MyForm() {
  return (
    <form className="form-container">
      <FormInput
        label="Name"
        placeholder="Enter your name"
        required
      />
      
      <FormSelect
        label="Category"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]}
      />
      
      <FormTextarea
        label="Description"
        placeholder="Enter description"
      />
      
      <div className="form-actions">
        <Button variant="primary" type="submit">Submit</Button>
        <Button variant="ghost" type="button">Cancel</Button>
      </div>
    </form>
  );
}
```

### Card Layout

```tsx
import { Card, Button } from '@/app/components/ui';

function ProductCard({ product }) {
  return (
    <Card>
      <Card.Header>
        <h3>{product.name}</h3>
      </Card.Header>
      <Card.Body>
        <p>{product.description}</p>
        <div className="product-price">${product.price}</div>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Add to Cart</Button>
        <Button variant="outline">Details</Button>
      </Card.Footer>
    </Card>
  );
}
```

### Feedback Messages

```tsx
import { Alert, useToast } from '@/app/components/ui';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleAction = () => {
    // Perform action
    showToast('Action completed successfully', 'success');
  };
  
  return (
    <div>
      <Alert variant="info" title="Information">
        This is important information for the user.
      </Alert>
      
      <Button onClick={handleAction}>Perform Action</Button>
    </div>
  );
}
```

### Loading States

```tsx
import { Loading, Skeleton } from '@/app/components/ui';

function MyComponent({ isLoading, data }) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading size="lg" />
      </div>
    );
  }
  
  // Or use skeleton loading
  if (isLoading) {
    return (
      <div className="skeleton-container">
        <Skeleton.Text lines={3} />
        <Skeleton.Button />
      </div>
    );
  }
  
  return (
    <div>
      {/* Actual content */}
    </div>
  );
}
```

## Responsive Design

Use the built-in responsive utilities:

```css
/* Mobile-first approach */
.my-component {
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .my-component {
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .my-component {
    padding: var(--space-8);
  }
}
```

## Accessibility Tips

1. Use semantic HTML elements
2. Provide text alternatives for images
3. Ensure sufficient color contrast
4. Make interactive elements keyboard accessible
5. Use ARIA attributes when necessary
6. Test with screen readers

## Best Practices

1. **Consistency**: Use the design system components consistently
2. **Simplicity**: Keep components simple and focused
3. **Reusability**: Create reusable components
4. **Accessibility**: Follow accessibility guidelines
5. **Performance**: Optimize components for performance

## Resources

- [Full Style Guide](./STYLE_GUIDE.md)
- [UI Components Documentation](../components/ui/README.md)
- [Design System Showcase](/design-system)