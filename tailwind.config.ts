import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E6F1FB",
          100: "#B5D4F4",
          200: "#85B7EB",
          400: "#378ADD",
          600: "#185FA5",
          800: "#0C447C",
          900: "#042C53",
        },
        ink: {
          900: "#2C2C2A",
          600: "#5F5E5A",
          400: "#888780",
        },
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
