# Industrial Design System

This design system implements an industrial, rugged aesthetic with clean lines for our MSP website.

## Design Tokens

### Colors

- **Primary**: `#f9a825` - Yellow/Orange for CTAs and highlights
- **Accent**: `#ff6f00` - Orange for price tags and accents
- **Dark**: `#212121` - Dark neutral for headers and body text
- **Light**: `#f5f5f5` - Light backgrounds and dividers
- **White**: `#ffffff` - Card backgrounds and content areas
- **Steel Grey**: `#546e7a` - Industrial accent color

### Typography

- **Headers**: Montserrat Bold/SemiBold
- **Body**: Open Sans Regular/Light

#### Font Sizes

| Style | Font | Size | Usage |
|-------|------|------|-------|
| H1 | Montserrat Bold | 48px | Hero Headings |
| H2 | Montserrat SemiBold | 32px | Section Titles |
| Body | Open Sans Regular | 16px | Product Descriptions, General Copy |
| Label | Open Sans Light | 12px | Captions, Metadata |
| CTA | Montserrat SemiBold | 14-16px | Buttons, Actions |

## Components

The design system includes the following components:

- **Button**: Primary, secondary, outline, and ghost variants
- **Card**: Default, elevated, bordered, and primary variants
- **Badge**: Status indicators and tags
- **Form Elements**: Input, Select, Textarea
- **Toast**: Notifications and alerts
- **Loading**: Loading indicators
- **Breadcrumb**: Navigation path indicators
- **ProductCard**: Product display card

## Usage

Import the design system CSS in your component:

```tsx
import '../styles/design-system.css';
```

Or use the pre-built components:

```tsx
import { Button, Card, Badge } from '../components/ui';

// Example usage
<Button variant="primary" size="lg">Add to Cart</Button>
```

## Responsive Design

The design system includes responsive breakpoints:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Accessibility

The design system is built with accessibility in mind:

- Proper color contrast
- Focus states
- Screen reader support
- Reduced motion support
- High contrast mode support

## Best Practices

1. Use the provided components whenever possible
2. Follow the color palette for consistency
3. Maintain typography hierarchy
4. Ensure responsive behavior
5. Test for accessibility