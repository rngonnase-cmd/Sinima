/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--f-display)', 'serif'],
        body:    ['var(--f-body)', 'sans-serif'],
        mono:    ['var(--f-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
