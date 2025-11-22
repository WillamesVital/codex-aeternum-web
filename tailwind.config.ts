import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",
                gold: {
                    400: "var(--color-gold-400)",
                    500: "var(--color-gold-500)",
                    600: "var(--color-gold-600)",
                },
                parchment: {
                    100: "var(--color-parchment-100)",
                    200: "var(--color-parchment-200)",
                    300: "var(--color-parchment-300)",
                },
                muted: {
                    foreground: "var(--color-parchment-200)",
                },
            },
            fontFamily: {
                cinzel: ["var(--font-cinzel)", "serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            boxShadow: {
                "gold-500/20": "0 10px 40px rgba(212, 175, 55, 0.2)",
            },
            animation: {
                "fade-in": "fadeIn 1s ease-out forwards",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
