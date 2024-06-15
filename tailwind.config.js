/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                merchant: {
                    primary: "#7289da",
                    secondary: "#99aab5",
                    accent: "#2c2f33",
                    neutral: "#23272a",
                    "base-100": "#2c2f33",
                    info: "#5865f2",
                    success: "#43b581",
                    warning: "#faa61a",
                    error: "#f04747",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
