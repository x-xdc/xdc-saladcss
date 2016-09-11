/**
 * @param  {object} xdc - add, remove and config
 * @param  {*} options - custom option
 */
module.exports = function (xdc, options) {
  xdc.add('vue.autoprefixer', false)

  var version = xdc.version
  version = version ? Number(version.split('.')[0]) : 0

  var plugins = function (webpack) {
    options = options || {}
    options.features = options.features || {}
    options.features.partialImport = options.features.partialImport || {}
    options.features.partialImport.addDependencyTo = webpack

    return version < 1 ? [require('postcss-salad')(options)] : require('postcss-salad')(options)
  }

  if (version < 1) {
    xdc.add('preLoader.postcss', {
      test: /\.css$/,
      loaders: ['postcss-loader']
    })
    xdc.add('vue.postcss', plugins)
  }

  xdc.add('postcss', plugins)
}
