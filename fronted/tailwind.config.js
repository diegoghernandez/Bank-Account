/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    opacity: {
      "4": "4%",
      "8": "8%",
      "12": "12%",
      "38": "38%",
      "80": "80%",
      "120": "120%"
    },
    colors: {
      "white": "#FFF",
      "black": "#000",
      "transparent": "transparent",

      "primary": "#2563EB",
      "onPrimary": "#EFF6FF",
      "primary-container": "#DBEAFE",
      "onPrimary-container": "#1E3A8A",
      
      "secondary-container": "#DEE4F8",
      "onSecondary-container": "#191B2B",
      
      "outline": "#74757E",
      "outline-variant": "#C4C4C7",

      "surface": "#F7F8FF",
      "surface-container": "#EDF0F7",
      "surface-container-high": "#E6E7F0",
      "surface-container-highest": "#E0E1E9",
      "onSurface": "#1B1C1F",
      "onSurface-variant": "#45454E",

      "error": "#B3261E",
      "on-error-container": "#410E0B",

      "primary-dark": "#BCCBFF",
      "onPrimary-dark": "#1E2672",
      "primary-container-dark": "#373F8B",
      "onPrimary-container-dark": "#DDE2FF",
      
      "secondary-container-dark": "#2D3041",
      "onSecondary-container-dark": "#DEE2F8",
      
      "outline-dark": "#8F8F99",
      "outline-variant-dark": "#45454F",

      "surface-dark": "#121218",
      "surface-container-dark": "#1F2026",
      "surface-container-high-dark": "#292A30",
      "surface-container-highest-dark": "#34343B",
      "onSurface-dark": "#E0E1E9",
      "onSurface-variant-dark": "#C4C4D0",

      "error-dark": "#F2B8B5",
      "on-error-container-dark": "#F9DEDC"
    },
    extend: {},
  },
  plugins: [],
};

