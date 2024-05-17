import type { Config } from "tailwindcss";
import tailwindcssForms from "@tailwindcss/forms";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xsm: "8px",
      },
      colors: {
        orange: {
          50: "#fff7eb",
          100: "#fde9c8",
          200: "#fbd18c",
          300: "#f9b350",
          400: "#f7941e",
          500: "#f1750f",
          600: "#d5530a",
          700: "#b1360c",
          800: "#902a10",
          900: "#762311",
          950: "#440f04",
        },
        blue: {
          50: "#eff7ff",
          100: "#deeeff",
          200: "#b6deff",
          300: "#76c4ff",
          400: "#2da7ff",
          500: "#028bf5",
          600: "#006dd2",
          700: "#0057aa",
          800: "#004a8d",
          900: "#073d73",
          950: "#04274d",
        },
      },
    },
  },
  plugins: [tailwindcssForms()],
};

export default config;
