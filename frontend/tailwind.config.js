/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px"
      },
      colors: {
        'custom-blue-200': '#2CC0C8',
        'custom-blue-300': '#25A0A7',
        'custom-blue-400': '#1D8085',
        'custom-blue-500': '#166064',
      },
    },
  },
  plugins: [],
}
