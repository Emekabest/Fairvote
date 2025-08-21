/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_layout.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        nunito:["Nunito-Regular"],
        'nunito-bold':['Nunito-Bold'],
      }
    },
  },
  plugins: [],
}

