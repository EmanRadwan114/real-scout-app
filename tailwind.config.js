/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
      },
      colors: {
        primary: "#d67d24",
        secondary: "#FF80001A",
        tertiary: "#FF80000A",
        black: "#1a1b1e",
        light: "#666876",
      },
    },
  },
  plugins: [],
};
