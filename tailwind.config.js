/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "hsl(var(--color-accent1) / <alpha-value>)",
        },
        bkg: {
          1: "hsl(var(--color-bkg1) / <alpha-value>)",
          2: "hsl(var(--color-bkg2) / <alpha-value>)",
        },
        content: {
          1: "hsl(var(--color-content1) / <alpha-value>)",
          2: "hsl(var(--color-content2) / <alpha-value>)",
        },
      },
      animation: {
        "spin-slower": "spin 35s ease infinite",
        "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};
