/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Metrix Analytics Design System
        metrix: {
          purple: {
            DEFAULT: '#7C3AED',
            dark: '#9D4EDD',
            light: '#C084FC',
            faint: '#A78BFA',
            badge: '#C4B5FD',
          },
          pink: '#F4A7BB',
          green: {
            bright: '#00D26A',
            soft: '#34D399',
          },
          red: '#FF4D6A',
          amber: {
            DEFAULT: '#FCD34D',
            warm: '#F59E0B',
          },
          bg: '#050505',
          text: '#FAFAFA',
          muted: 'rgba(255, 255, 255, 0.70)',
          muted3: 'rgba(255, 255, 255, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #7C3AED, #F4A7BB)',
      },
    },
  },
  plugins: [],
}
