const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      red: colors.rose,
      pink: colors.fuchsia,
      gray: colors.trueGray,
      white: colors.white,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
