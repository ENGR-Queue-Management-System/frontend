import { describe } from "node:test";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        default: "#333333",
        describe: "#676767",
        delete: "#ff4747",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#009999",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#005974",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "#630505",
          foreground: "hsl(var(--secondary-foreground))",
        },
        table: {
          background: "#e4f7f7",
          foreground: "#009999",
          rows: "#F8F9FA",
        },
        contactList: {
          scholarship: "#009CFF",
          consultation: "#6160B7",
          report: "#FF7246",
          request: "#00B485",
          others: "#7C7375",
          internship: "#EF476F",
        },
        shadow: {
          table: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
        },
        error: "#fa5252",
        // card: {
        //   DEFAULT: "hsl(var(--card))",
        //   foreground: "hsl(var(--card-foreground))",
        // },
        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },

        // muted: {
        //   DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        // },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        h1: "20px",
        h2: "18px",
        b1: "16px",
        b2: "14px",
        b3: "13px",
        b4: "12px",
        b5: "11px",
        b6: "10px",
      },
      screens: {
        iphone: "300px",
        sm: "1024px",
        ipad11: "1194px",
        acerSwift: "1200px",
        macair133: "1280px",
        samsungA24: "1600px",
      },
      fontFamily: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
