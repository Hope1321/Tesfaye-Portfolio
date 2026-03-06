/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#916704',       // your main brand color
        'brand-hover': '#FFD700', // gold hover color
      },
    },
  },
  plugins: [],
};
