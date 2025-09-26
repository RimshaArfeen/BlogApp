

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode based on the 'dark' class on the HTML element
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#005A8D', // Used for headings, buttons, and key call-to-action elements in light mode
          dark: '#3C91E6', // Used for headings, buttons, and key call-to-action elements in dark mode
        },
        secondary: {
          DEFAULT: '#F9C74F', // Used for accents, highlights, or secondary buttons in both modes
        },
        neutral: {
          bg: {
            light: '#F7F9FC', // Used for the main background color of the page in light mode
            dark: '#1A202C', // Used for the main background color of the page in dark mode
          },
          text: {
            light: '#4B5563', // Used for body text and general paragraphs in light mode
            dark: '#D1D5DB', // Used for body text and general paragraphs in dark mode
          },
          element: {
            light: '#FFFFFF', // Used for card backgrounds, input fields, and UI elements in light mode
            dark: '#2D3748', // Used for card backgrounds, input fields, and UI elements in dark mode
          },
        },
      },
    },
  },
  plugins: [],
}

