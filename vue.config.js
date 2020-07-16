module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath:'./',
  outputDir:'dist',
  lintOnSave: false,
  devServer:{
    open:true,
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
        target:'http://localhost:8080/',
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          '^/api':'http://localhost:8080/'
        }
      }
    }
  },
}
