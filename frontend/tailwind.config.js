/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            'primary': '#264653',
            'secondary': '#2a9d8f',
            'warning': '#e9c46a',
            'danger': '#e76f51',
            'error': '#f4a261',
         }
      },
   },
   plugins: [],
};