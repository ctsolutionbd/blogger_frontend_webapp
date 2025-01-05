/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,css,js,jsx}"], // Ensure all relevant files are scanned
  theme: {
    extend: {
      colors: {
        customBlue: '#1E3A8A', // Example custom color
      },
      // Extend transitions to ensure smooth animations
      transitionProperty: {
        'opacity': 'opacity',
      },
    },
  },
  plugins: [
    require('daisyui'), // Add daisyUI plugin
  ],
  daisyui: {
    themes: ["fantasy", "dim", "halloween"], // Customize daisyUI themes
  },
  safelist: [
    'opacity-0', 
    'opacity-100', 
    'invisible', 
    'visible', 
    'transition-opacity', 
    'duration-1000', 
    'ease-in-out',
  ],
};
