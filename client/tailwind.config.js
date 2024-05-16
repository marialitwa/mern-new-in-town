    /** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Create my own classes here, e.g.
  theme: {
    
    extend: {
      colors: {
      "primary-btn": "#B5838D",
      // "secondary-btn": "#E5989B",
      // use "primary-btn" like a regular className: bg-primary-btn
    },

    },


  },
  plugins: [],
}
 

