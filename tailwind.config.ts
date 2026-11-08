
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '75px',
      screens: {
        xl: '1280px',
        '2xl': '1280px',
      },
    },
    extend: {
      boxShadow: {
        button: '0px 8px 18px 0px rgba(138, 155, 118, 0.22)',
        indicator: '0px 8px 20px 0px rgba(38, 58, 50, 0.08)',
      },
      colors: {
        border: 'hsl(var(--border))',
        'gray-light': '#F1F0E8',
        placeholder: '#8A9188',
        separator: {
          DEFAULT: '#DCE2D5',
          foreground: '#687568',
        },
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'gradient-black': '#263A32',
        primary: {
          DEFAULT: '#8A9B76',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#263A32',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        subtitle: '#7B857A',
        destructive: {
          DEFAULT: '#DC4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
