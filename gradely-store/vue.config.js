const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,

  pages: {
    index: {
      entry: "./src/main.js",
    },
  },

  lintOnSave: false,
  productionSourceMap: false,
  publicPath: "auto",

  css: {
    loaderOptions: {
      scss: {
        implementation: require("sass"),
      },
    },
  },

  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "async",
            reuseExistingChunk: true,
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            chunks: "async",
            reuseExistingChunk: true,
          },
        },
      },
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "gradelyStore",
        filename: "remoteEntry.js",
        exposes: {
          // EXPOSED STORE STYLES
          "./app-style": "./src/assets/scss/app.scss",
          "./app-config-style": "./src/assets/scss/style-config-export.scss",
        },
        shared: {
          ...deps,
          vue: { eager: true, singleton: true, requiredVersion: deps.vue },
          "vue-router": {
            eager: true,
            singleton: true,
            requiredVersion: deps["vue-router"],
          },
          vuex: { eager: true, singleton: true, requiredVersion: deps.vuex },
        },
      }),
    ],
  },
});
