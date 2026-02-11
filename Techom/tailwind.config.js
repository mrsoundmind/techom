/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                primary: '#0f172a', // Slate 900
                secondary: '#2563eb', // Blue 600
                accent: '#ef4444', // Red 500
            }
        },
    },
    plugins: [],
}
