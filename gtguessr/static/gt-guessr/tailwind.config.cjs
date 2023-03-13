const plugin = require('tailwindcss/plugin')

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      
    },
  },

  plugins: [plugin(function({addVariant}) {
    addVariant('not-last', '&:not(:last-child)')
  })],
};

module.exports = config;
