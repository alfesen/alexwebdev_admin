const path = require('path')
module.exports = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      hooks: path.resolve(__dirname, './src/hooks'),
      context: path.resolve(__dirname, './src/context')
    }
  }
}
