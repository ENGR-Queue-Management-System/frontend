import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0077b6",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#0D1D70",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "#630505",
          foreground: "hsl(var(--secondary-foreground))",
        },
        table: {
          background: "#EAEDFC",
          foreground: "#0D1D70",
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
        b3: "12px",
      },
      fontFamily: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
