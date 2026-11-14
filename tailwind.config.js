/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#01040A',
        navy: {
          950: '#01040A',
          900: '#020712',
          850: '#030E1E',
          800: '#06172E',
          700: '#0A2544',
        },
        cyan: {
          glow: '#00E5FF',
          bright: '#38BDF8',
          deep: '#0EA5E9',
          dark: '#0284C7',
        },
        clinical: {
          bg: '#01040A',
          panel: '#020712',
          border: 'rgba(56, 189, 248, 0.16)',
          glow: 'rgba(14, 165, 233, 0.30)',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -3px rgba(14, 165, 233, 0.45)',
        'cyan-lg': '0 12px 36px -6px rgba(14, 165, 233, 0.35)',
        'cyan-intense': '0 0 45px rgba(0, 229, 255, 0.5)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.98)' },
        },
        'ecg-scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'ecg-scan': 'ecg-scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
