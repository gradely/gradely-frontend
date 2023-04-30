const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false,
  // publicPath: "auto",

  css: {
    loaderOptions: {
      scss: {
        implementation: require("sass"),
        additionalData: `@import "../~gradely_asset_store/src/basic_scss/_colors.scss"; @import "../~gradely_asset_store/src/basic_scss/_breakpoints.scss"; @import "../~gradely_asset_store/src/basic_scss/_mixins.scss";`,
      },
    },
  },
});
