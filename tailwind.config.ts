import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#e6f2ff",
          100: "#cce5ff",
          200: "#99cbff",
          300: "#66b0ff",
          400: "#3396ff",
          500: "#0066CC", // Main primary
          600: "#0052a3",
          700: "#003d7a",
          800: "#002952",
          900: "#001429",
        },
        secondary: {
          50: "#fff0eb",
          100: "#ffe0d6",
          200: "#ffc1ad",
          300: "#ffa385",
          400: "#ff845c",
          500: "#FF6B35", // Main secondary
          600: "#cc562a",
          700: "#994020",
          800: "#662b15",
          900: "#33150b",
        },
        success: {
          50: "#e6fdf5",
          100: "#ccfaeb",
          200: "#99f6d7",
          300: "#66f1c3",
          400: "#33edaf",
          500: "#06D6A0",
          600: "#05ab80",
          700: "#048060",
          800: "#025540",
          900: "#012b20",
        },
        warning: {
          50: "#fff9e6",
          100: "#fff2cc",
          200: "#ffe699",
          300: "#ffd966",
          400: "#ffcd33",
          500: "#FFB800",
          600: "#cc9300",
          700: "#996e00",
          800: "#664a00",
          900: "#332500",
        },
        error: {
          50: "#feeef2",
          100: "#fddce5",
          200: "#fbb9cb",
          300: "#f997b1",
          400: "#f77497",
          500: "#EF476F",
          600: "#bf3959",
          700: "#8f2b43",
          800: "#601c2c",
          900: "#300e16",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
