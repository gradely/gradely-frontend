const vueConfig = {
  publicPath: "/lesson",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 8097,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "../~gradely_asset_store/src/basic_scss/_colors.scss";
          @import "../~gradely_asset_store/src/basic_scss/_breakpoints.scss";
          @import "../~gradely_asset_store/src/basic_scss/_mixins.scss";
          @import "../~gradely_asset_store/src/basic_scss/_modal.scss";
          @import "../~gradely_asset_store/src/basic_scss/_buttons.scss";
          @import "@/assets/scss/_mixins.scss";
        `,
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

  configureWebpack: {
    performance: {
      hints: false,
      maxAssetSize: 1048576, // int (in bytes),
      maxEntrypointSize: 1048576, // int (in bytes)
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  },
};

module.exports = vueConfig;