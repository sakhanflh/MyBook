/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bb-bg': '#040D12',
        'bb-section': '#183D3D',
        'bb-text': '#93B1A6',
        'bb-extra': '#5C8374',
        'uang-bg': '#000000',
        'uang-section': '#33425B',
        'uang-text': '#D8E9F0',
        'uang-pengeluaran': '#3D0000',
        'uang-pemasukan': '#04879C',
      },
    },
  },
  plugins: [],
}

