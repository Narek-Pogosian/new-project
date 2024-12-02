import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      neutral: colors.zinc,
      danger: colors.rose,
      accent: colors.pink,
      "accent-foreground": colors.white,
    },
    borderRadius: {
      sm: "calc(var(--radius) - 2px)",
      DEFAULT: "var(--radius)",
      md: "calc(var(--radius) + 2px)",
      full: "999px",
      none: "0px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1240px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground-muted))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          popover: "hsl(var(--background-popover))",
          "popover-focus": "hsl(var(--background-popover-focus))",
          input: "hsl(var(--background-input))",
          card: "hsl(var(--background-card))",
        },
        scrollbar: "hsl(var(--scrollbar))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;
