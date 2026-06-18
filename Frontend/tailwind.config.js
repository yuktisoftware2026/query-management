/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo 600
          light: '#6366F1', // Indigo 500
          dark: '#4338CA', // Indigo 700
        },
        secondary: {
          DEFAULT: '#0F172A', // Slate 900
          light: '#1E293B', // Slate 800
          dark: '#020617', // Slate 950
        },
        accent: {
          green: '#10B981', // Emerald 500
          orange: '#F59E0B', // Amber 500
        },
        background: {
          DEFAULT: '#FAFAFA', // Zinc 50
          cream: '#F4F4F5', // Zinc 100
        },
        surface: {
          DEFAULT: '#FFFFFF', // White
          hover: '#F4F4F5', // Zinc 100
        },
        text: {
          primary: '#18181B', // Zinc 900
          secondary: '#52525B', // Zinc 600
          light: '#A1A1AA', // Zinc 400
        },
        border: {
          DEFAULT: '#E4E4E7', // Zinc 200
          focus: '#4F46E5', // Indigo 600
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
