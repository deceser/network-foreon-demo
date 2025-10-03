/* eslint-env node */

/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwindcss-percentage-width'),
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '90rem',
      },
    },
    extend: {
      fontSize: {
        10: '0.625rem',
        15: '0.9375rem',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        gradient: 'gradient 2s linear infinite',
      },
      borderColor: {
        success: 'hsl(var(--success))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'bg-gradient-1': 'var(--bg-button-from)',
        'bg-gradient-2': 'var(--bg-button-via)',
        'bg-gradient-3': 'var(--bg-button-to)',
        'gray-1': 'hsl(var(--neutral90))',
        'gray-2': 'var(--shadow-select)',
        'gray-3': 'var(--text-select)',
        'gray-4': 'var(--gray-4)',
        'purple-1': 'var(--bg-checkbox)',
        'green-1': 'var(--green-1)',
        'red-1': 'var(--red-1)',
        'red-2': 'var(--red-2)',
        'green-2': 'var(--green-2)',
        backgroundImage: {
          'custom-gradient':
            '(linear-gradient(135deg, #00A9B7 -1.33%, #4C32F2 47.36%, #9F00BE 95.53%))',
        },
        primary: {
          10: 'hsl(var(--primary10) / <alpha-value>)',
          20: 'hsl(var(--primary20) / <alpha-value>)',
          30: 'hsl(var(--primary30) / <alpha-value>)',
          40: 'hsl(var(--primary40) / <alpha-value>)',
          50: 'hsl(var(--primary50) / <alpha-value>)',
          60: 'hsl(var(--primary60) / <alpha-value>)',
          70: 'hsl(var(--primary70) / <alpha-value>)',
          80: 'hsl(var(--primary80) / <alpha-value>)',
          90: 'hsl(var(--primary90) / <alpha-value>)',
          95: 'hsl(var(--primary95) / <alpha-value>)',
        },
        secondary: {
          10: 'hsl(var(--secondary10) / <alpha-value>)',
          20: 'hsl(var(--secondary20) / <alpha-value>)',
          30: 'hsl(var(--secondary30) / <alpha-value>)',
          40: 'hsl(var(--secondary40) / <alpha-value>)',
          50: 'hsl(var(--secondary50) / <alpha-value>)',
          60: 'hsl(var(--secondary60) / <alpha-value>)',
          70: 'hsl(var(--secondary70) / <alpha-value>)',
          80: 'hsl(var(--secondary80) / <alpha-value>)',
          90: 'hsl(var(--secondary90) / <alpha-value>)',
          95: 'hsl(var(--secondary95) / <alpha-value>)',
        },
        tertiary: {
          10: 'hsl(var(--tertiary10) / <alpha-value>)',
          20: 'hsl(var(--tertiary20) / <alpha-value>)',
          30: 'hsl(var(--tertiary30) / <alpha-value>)',
          40: 'hsl(var(--tertiary40) / <alpha-value>)',
          50: 'hsl(var(--tertiary50) / <alpha-value>)',
          60: 'hsl(var(--tertiary60) / <alpha-value>)',
          70: 'hsl(var(--tertiary70) / <alpha-value>)',
          80: 'hsl(var(--tertiary80) / <alpha-value>)',
          90: 'hsl(var(--tertiary90) / <alpha-value>)',
          95: 'hsl(var(--tertiary95) / <alpha-value>)',
        },
        error: {
          10: 'hsl(var(--error10) / <alpha-value>)',
          20: 'hsl(var(--error20) / <alpha-value>)',
          30: 'hsl(var(--error30) / <alpha-value>)',
          40: 'hsl(var(--error40) / <alpha-value>)',
          50: 'hsl(var(--error50) / <alpha-value>)',
          60: 'hsl(var(--error60) / <alpha-value>)',
          70: 'hsl(var(--error70) / <alpha-value>)',
          80: 'hsl(var(--error80) / <alpha-value>)',
          90: 'hsl(var(--error90) / <alpha-value>)',
          95: 'hsl(var(--error95) / <alpha-value>)',
        },
        neutralVariant: {
          10: 'hsl(var(--neutral-variant10) / <alpha-value>)',
          20: 'hsl(var(--neutral-variant20) / <alpha-value>)',
          30: 'hsl(var(--neutral-variant30) / <alpha-value>)',
          40: 'hsl(var(--neutral-variant40) / <alpha-value>)',
          50: 'hsl(var(--neutral-variant50) / <alpha-value>)',
          60: 'hsl(var(--neutral-variant60) / <alpha-value>)',
          70: 'hsl(var(--neutral-variant70) / <alpha-value>)',
          80: 'hsl(var(--neutral-variant80) / <alpha-value>)',
          90: 'hsl(var(--neutral-variant90) / <alpha-value>)',
          95: 'hsl(var(--neutral-variant95) / <alpha-value>)',
        },
        neutral: {
          10: 'hsl(var(--neutral10) / <alpha-value>)',
          20: 'hsl(var(--neutral20) / <alpha-value>)',
          30: 'hsl(var(--neutral30) / <alpha-value>)',
          40: 'hsl(var(--neutral40) / <alpha-value>)',
          50: 'hsl(var(--neutral50) / <alpha-value>)',
          60: 'hsl(var(--neutral60) / <alpha-value>)',
          70: 'hsl(var(--neutral70) / <alpha-value>)',
          80: 'hsl(var(--neutral80) / <alpha-value>)',
          90: 'hsl(var(--neutral90) / <alpha-value>)',
          95: 'hsl(var(--neutral95) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        border: 'var(--border)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        foreground: 'var(--foreground)',
        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)',
        },
        input: 'var(--input)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        ring: 'var(--ring)',
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },
        dark: {
          background: 'hsl(var(--dark-background))',
          foreground: 'hsl(var(--dark-foreground))',
          primary: 'hsl(var(--dark-primary))',
          secondary: 'hsl(var(--dark-secondary))',
        },
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradient: {
          to: { 'background-position': '200% center' },
        },
      },
      screens: {
        xs: '432px',
      },
    },
  },
};
