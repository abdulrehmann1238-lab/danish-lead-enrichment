/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: {
          DEFAULT: 'var(--surface)',
          secondary: 'var(--surface-secondary)',
          border: 'var(--surface-border)',
        },
        forest: {
          50: '#edf4f1',
          100: '#d5e4de',
          200: '#adc9bf',
          300: '#7fa89c',
          400: '#558779',
          500: '#3a6c5f',
          600: '#2c544a',
          700: '#25443c',
          800: '#203C34', // Deep Forest Green (#203C34)
          900: '#1a312b',
          950: '#0d1c18',
        },
        sage: {
          50: '#f5f7f5',
          100: '#e9eee9', // Muted Sage (#E9EEE9)
          200: '#d4ded7',
          300: '#b4c4ba',
          400: '#91a79a',
          500: '#739181', // Sage Green (#739181)
          600: '#5a7566',
          700: '#475d52',
          800: '#3a4b43',
          900: '#313e38',
        },
        sand: {
          50: '#faf9f6',
          100: '#f4f1eb',
          200: '#e9e5dc', // Warm Sand (#E9E5DC)
          300: '#d8d1c3',
          400: '#c0b6a2',
          500: '#a79a83',
        },
        nordic: {
          text: '#202923',
          muted: '#758078',
          border: '#E8ECE7',
          bg: '#F7F8F5',
          white: '#FFFFFF',
          success: '#3D8060',
          warning: '#C18A45',
          error: '#B85D57',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '14px',
        '2xl': '18px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 2px 8px -2px rgba(32, 60, 52, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'dropdown': '0 10px 25px -5px rgba(20, 35, 30, 0.1), 0 8px 10px -6px rgba(20, 35, 30, 0.05)',
        'modal': '0 20px 40px -15px rgba(20, 35, 30, 0.15), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
};
