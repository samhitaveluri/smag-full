import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                s1: "#82DAFF",
                s2: "#1AA2EF",
                s3: "#0E6EB8",
            },
            fontFamily: {
                teko: "var(--font-teko)",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
export default config;
