// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Industrial Design System Colors
      colors: {
        primary: {
          DEFAULT: '#f9a825',
          50: '#fef7e0',
          100: '#fdecc8',
          200: '#fbd38d',
          300: '#f9a825',
          400: '#e69500',
          500: '#cc8400',
          600: '#b37300',
          700: '#996200',
          800: '#805200',
          900: '#664100',
        },
        accent: {
          DEFAULT: '#ff6f00',
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800',
          600: '#ff6f00',
          700: '#e65100',
          800: '#bf360c',
          900: '#8d2f00',
        },
        dark: {
          DEFAULT: '#212121',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        light: {
          DEFAULT: '#f5f5f5',
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#eeeeee',
          400: '#e0e0e0',
        },
        steel: {
          DEFAULT: '#546e7a',
          50: '#eceff1',
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#90a4ae',
          400: '#78909c',
          500: '#607d8b',
          600: '#546e7a',
          700: '#455a64',
          800: '#37474f',
          900: '#263238',
        },
      },
      // Typography System
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '300' }],
        'cta': ['14px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      // Spacing and Layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Border Radius
      borderRadius: {
        'industrial': '8px',
      },
      // Box Shadows
      boxShadow: {
        'light': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'heavy': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'industrial': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'industrial-hover': '0 6px 12px rgba(0, 0, 0, 0.15)',
      },
      // Transitions
      transitionTimingFunction: {
        'industrial': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Grid Templates
      gridTemplateColumns: {
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
