# ConstructPro Design System Style Guide

## Introduction

This style guide documents the design system for the ConstructPro website. It provides guidelines for consistent visual design, component usage, and accessibility standards across the application.

## Design Principles

### Industrial Aesthetic
- Rugged, durable appearance
- Clean lines and structured layouts
- Emphasis on functionality and clarity

### Clarity
- Clear visual hierarchy
- Intuitive navigation
- Readable typography

### Consistency
- Uniform component styling
- Predictable interaction patterns
- Standardized spacing and sizing

### Accessibility
- Inclusive design for all users
- Support for assistive technologies
- Compliance with WCAG 2.1 AA standards

## Color Palette

### Primary Colors
- **Primary Yellow/Orange**: `#f9a825` - Used for primary CTAs, highlights, and key UI elements
- **Accent Orange**: `#ff6f00` - Used for price tags, secondary accents, and hover states

### Neutral Colors
- **Dark**: `#212121` - Used for headers, body text, and dark backgrounds
- **Light**: `#f5f5f5` - Used for backgrounds, cards, and dividers
- **White**: `#ffffff` - Used for card backgrounds and content areas

### Steel Grays
- **Steel Gray**: `#546e7a` - Used for industrial accents and secondary elements
- **Steel Gray Light**: `#78909c` - Used for lighter industrial accents
- **Steel Gray Dark**: `#37474f` - Used for darker industrial accents

### Status Colors
- **Success**: `#28a745` - Used for success states and positive indicators
- **Warning**: `#ffc107` - Used for warning states and cautionary indicators
- **Danger**: `#dc3545` - Used for error states and negative indicators
- **Info**: `#17a2b8` - Used for informational states and neutral indicators

### Gray Scale
- **Gray 50**: `#fafafa`
- **Gray 100**: `#f5f5f5`
- **Gray 200**: `#eeeeee`
- **Gray 300**: `#e0e0e0`
- **Gray 400**: `#bdbdbd`
- **Gray 500**: `#9e9e9e`
- **Gray 600**: `#757575`
- **Gray 700**: `#616161`
- **Gray 800**: `#424242`
- **Gray 900**: `#212121`

## Typography

### Font Families
- **Headings**: Montserrat (Bold/SemiBold)
- **Body**: Open Sans (Regular/Light)

### Font Sizes
- **Extra Small**: 0.75rem (12px) - Labels, captions
- **Small**: 0.875rem (14px) - Small text, buttons
- **Base**: 1rem (16px) - Body text
- **Large**: 1.125rem (18px) - Large body text
- **Extra Large**: 1.25rem (20px) - Small headers
- **2XL**: 1.5rem (24px) - Medium headers
- **3XL**: 2rem (32px) - Section titles
- **4XL**: 3rem (48px) - Hero headings

### Font Weights
- **Light**: 300
- **Regular**: 400
- **SemiBold**: 600
- **Bold**: 700

### Line Heights
- **Tight**: 1.2 - Headings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.6 - Large body text

### Usage Guidelines
- Use Montserrat for headings, buttons, and important UI elements
- Use Open Sans for body text, form elements, and general content
- Maintain proper contrast ratios for readability (minimum 4.5:1 for normal text)
- Avoid using more than 3 font sizes on a single screen

## Spacing

### Scale
- **Space 1**: 0.25rem (4px)
- **Space 2**: 0.5rem (8px)
- **Space 3**: 0.75rem (12px)
- **Space 4**: 1rem (16px)
- **Space 5**: 1.25rem (20px)
- **Space 6**: 1.5rem (24px)
- **Space 8**: 2rem (32px)
- **Space 10**: 2.5rem (40px)
- **Space 12**: 3rem (48px)
- **Space 16**: 4rem (64px)
- **Space 20**: 5rem (80px)

### Usage Guidelines
- Use consistent spacing to create visual rhythm
- Apply spacing scale for margins, paddings, and gaps
- Use smaller spacing values for related elements and larger values for separate sections
- Maintain consistent spacing in responsive layouts

## Border Radius

- **Small**: 0.25rem (4px) - Small elements like badges
- **Medium**: 0.375rem (6px) - Buttons, inputs
- **Large**: 0.5rem (8px) - Cards, modals
- **Extra Large**: 0.75rem (12px) - Larger cards, hero sections
- **2XL**: 1rem (16px) - Featured elements
- **Full**: 9999px - Pills, rounded buttons

## Shadows

- **Shadow SM**: 0 1px 2px 0 rgba(0, 0, 0, 0.05) - Subtle elevation
- **Shadow MD**: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) - Default elevation
- **Shadow LG**: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) - Medium elevation
- **Shadow XL**: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) - High elevation
- **Shadow 2XL**: 0 25px 50px -12px rgba(0, 0, 0, 0.25) - Maximum elevation

## Components

### Buttons

#### Variants
- **Primary**: Yellow/orange gradient background, white text
- **Secondary**: White background, dark text, gray border
- **Outline**: Transparent background, primary color border and text
- **Ghost**: Transparent background and border, gray text

#### Sizes
- **Small**: Compact size for tight spaces
- **Medium**: Default size for most contexts
- **Large**: Emphasized size for important actions
- **Extra Large**: Maximum emphasis for hero sections

#### States
- **Default**: Normal appearance
- **Hover**: Slightly darker background, subtle lift effect
- **Focus**: Focus ring for keyboard navigation
- **Active**: Pressed appearance
- **Disabled**: Muted appearance, not clickable
- **Loading**: Loading indicator, not clickable

### Cards

#### Variants
- **Default**: White background, subtle border and shadow
- **Elevated**: White background, more pronounced shadow
- **Bordered**: White background, colored border
- **Primary**: Colored header, white body

#### Parts
- **Header**: Optional header section
- **Body**: Main content area
- **Footer**: Optional footer section

### Form Elements

#### Input
- Text input with label, optional help text, and validation states

#### Select
- Dropdown select with label, options, and validation states

#### Textarea
- Multi-line text input with label and validation states

#### Validation States
- **Default**: Normal appearance
- **Focus**: Focus ring
- **Invalid**: Error state with message
- **Valid**: Success state

### Navigation

#### Main Navigation
- Desktop and mobile navigation with dropdown support

#### Breadcrumbs
- Path-based navigation showing current location

#### Pagination
- Navigation between pages of content

### Feedback

#### Toast
- Temporary notifications for user feedback

#### Alert
- Persistent messages for important information

#### Modal
- Dialog boxes for focused interactions

### Content Display

#### Accordion
- Collapsible content sections

#### Tabs
- Tabbed interface for switching between content sections

#### Skeleton
- Loading placeholders for content

## Responsive Design

### Breakpoints
- **SM**: 640px - Small devices
- **MD**: 768px - Medium devices
- **LG**: 1024px - Large devices
- **XL**: 1280px - Extra large devices
- **2XL**: 1536px - 2X large devices

### Approach
- Mobile-first design
- Fluid layouts that adapt to screen size
- Responsive typography and spacing
- Appropriate touch targets for mobile

## Accessibility Guidelines

### Color and Contrast
- Maintain minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color to convey information
- Support high contrast mode

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Provide visible focus indicators
- Implement logical tab order

### Screen Readers
- Use semantic HTML elements
- Provide appropriate ARIA attributes
- Include alternative text for images

### Motion and Animation
- Respect reduced motion preferences
- Keep animations subtle and purposeful
- Avoid flashing content

## Implementation

### CSS Variables
All design tokens are implemented as CSS custom properties in the design-system.css file.

### Component Classes
Components use consistent class naming and structure.

### Utility Classes
Utility classes are available for common styling needs.

## Best Practices

1. **Consistency**: Use the design system components consistently across the application
2. **Accessibility**: Follow accessibility guidelines for all components
3. **Performance**: Optimize components for performance
4. **Responsiveness**: Test components across different screen sizes
5. **Documentation**: Keep the design system documentation updated