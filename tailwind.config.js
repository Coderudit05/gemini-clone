/** @type {import('tailwindcss').Config} */
export default {
  // Note: With Tailwind v4 + @tailwindcss/vite, content scanning is automatic.
  // Keeping these paths for compatibility is harmless.
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  // Tailwind v4: third-party plugins are registered via CSS using the `@plugin` directive.
  // See src/index.css where we add: @plugin "tailwind-scrollbar";
  plugins: [],
}