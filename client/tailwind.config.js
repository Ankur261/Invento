/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss",
     function({ addComponents }) {
      addComponents({
        '.input': {
          backgroundColor: '#fff',
          color: '#000',
          borderColor: '#d1d5db',
          borderRadius: '0.375rem',
          padding: '0.5rem 0.75rem',
          '&:focus': {
            outline: 'none',
            ringWidth: '2px',
            ringColor: '#3b82f6',
          }
        }
      });
    }
  ],
}

