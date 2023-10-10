const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    join(__dirname, "{src,.storybook}/**/*!(*.spec).{ts,tsx,html}"),
    "node_modules/@rafty/ui/**/*.{js,cjs}",
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@rafty/plugin")],
};
