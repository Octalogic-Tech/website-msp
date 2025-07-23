# ConstructPro Frontend

This is the frontend codebase for the ConstructPro website, an industrial machinery and equipment supplier platform.

## UI/UX Design System

The website uses a comprehensive design system with an industrial, rugged aesthetic featuring clean lines and a consistent color palette. For detailed information about the UI/UX enhancements, see [UI_UX_ENHANCEMENTS.md](./UI_UX_ENHANCEMENTS.md).

### Key Features

- **Industrial Design System**: Consistent design tokens for colors, typography, spacing, and more
- **Component Library**: Reusable UI components for faster development and consistent user experience
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Accessibility**: Support for keyboard navigation, screen readers, and other assistive technologies

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/       # Homepage components
│   │   │   ├── shop/       # Shop-related components
│   │   │   ├── ui/         # Reusable UI components
│   │   │   ├── Footer.tsx  # Global footer component
│   │   │   └── Navigation.tsx # Global navigation component
│   │   ├── design-system/  # Design system showcase
│   │   ├── shop/           # Shop pages
│   │   ├── styles/         # Global styles and design system
│   │   └── layout.tsx      # Root layout component
│   └── ...
└── ...
```

## Design System

The design system is defined in `src/app/styles/design-system.css` and includes:

- **Color Palette**: Primary, accent, neutral, and status colors
- **Typography**: Font families, sizes, weights, and styles
- **Spacing**: Consistent spacing scale
- **Components**: Buttons, cards, forms, and more

For detailed information about the design system, see [STYLE_GUIDE.md](./src/app/styles/STYLE_GUIDE.md).

## Component Library

The UI component library is located in `src/app/components/ui/` and includes:

- **Layout Components**: Card, Modal
- **Form Components**: Button, FormInput, FormSelect, FormTextarea, Dropdown
- **Navigation Components**: Breadcrumb, Pagination, Tabs
- **Feedback Components**: Alert, Badge, Toast, Loading, Skeleton
- **Content Components**: Accordion

For detailed information about the components, see [UI Components README](./src/app/components/ui/README.md).

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## Design System Showcase

To explore the design system components, visit `/design-system` in the running application. This page showcases all available components with examples and usage information.

## Accessibility

The website is built with accessibility in mind and follows WCAG 2.1 AA guidelines:

- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support
- Reduced motion support
- High contrast mode support

## Browser Support

The website supports the following browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)