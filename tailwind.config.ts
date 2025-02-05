import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        DEFAULT: "1300px",
      },
    },
    extend: {
      colors: {
        divider: "#E2E8F0",
        primary: "#191a22",
      },
      borderRadius: {
        large: "1.25rem",
        xlarge: "2.5rem",
      },
      fontFamily: {
        primary: ["var(--font-manrope)"],
        secondary: ["var(--font-inter)"],
      },
      dropShadow: {
        bio: "-47px 13px 38px rgba(125,135,145,0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
