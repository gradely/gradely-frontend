const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false,
  productionSourceMap: false,

  css: {
    loaderOptions: {
      scss: {
        implementation: require("sass"),
        additionalData: `@import "./public/scss/basic_scss/_colors.scss"; @import "./public/scss/basic_scss/_breakpoints.scss"; @import "./public/scss/basic_scss/_mixins.scss";`,
      },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.(pdf)(\?.*)?$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "./src/assets/files/[name].[hash:8].[ext]",
      });
  },
});
