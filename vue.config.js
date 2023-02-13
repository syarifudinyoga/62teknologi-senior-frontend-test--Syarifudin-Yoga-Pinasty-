//const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: 'https://api.yelp.com/'
  }
}
