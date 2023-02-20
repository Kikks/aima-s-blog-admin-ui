/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      cormorant: ['"Cormorant Garamond", serif'],
      catamaran: ['"Catamaran", sans-serif'],
      ephesis: ['"Ephesis", cursive'],
    },
    fontSize: {
      xxs: '0.65rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        'aima-black': '#003049',
        'aima-white': '#FCFCFC',
        primary: {
          main: '#FC951F',
          lighter: '#FFEBD3',
          light: '#FFDDB6',
          border: '#FAA888',
          border2: '#FC951F',
          bg: '#FFF5EA',
        },
        secondary: {
          main: '#147E9B',
          light: '#DFF5FB',
          border: '#6DC8E1',
        },
      },
    },
  },
  plugins: [],
};
