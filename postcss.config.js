const plugins = {
  'postcss-preset-env': {}
}

if (process.env.NODE_ENV === 'production') {
  plugins['css-nano'] = {}
}

module.exports = {
  plugins
}
