const {lightBlue, ...colors} = require('tailwindcss/colors')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ...colors,

        red: colors.rose,
        pink: colors.fuchsia,
        gray: colors.trueGray,
        white: colors.white,
      },

      boxShadow: {
        carbon: 'rgb(0 0 0 / 55%) 0px 20px 68px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = config
