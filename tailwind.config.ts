import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

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
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(141.1% 68.3% at 48.3% 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40.9134%, rgba(25, 26, 33, 0.5) 71.2063%, rgba(25, 26, 33, 0.8) 100%)",
        "hero-shadow":
          "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 60%)",
      },
      colors: {
        divider: "#E2E8F0",
        primary: "#191a22",
        secondary: "#647586",
      },
      borderRadius: {
        large: "1.25rem",
        xlarge: "2.5rem",
      },
      fontFamily: {
        primary: ["var(--font-manrope)"],
      },
      dropShadow: {
        bio: "-47px 13px 38px rgba(125,135,145,0.25)",
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
