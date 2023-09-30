module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      exclude:[/node_modules\/vant/i]
    },
  }
}
