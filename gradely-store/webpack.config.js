const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:8080/",
    "webpack/hot/dev-server",
    "./src/main.js",
  ],

  resolve: {
    extensions: [".js", ".vue", ".svg"],
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:8080/",
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  infrastructureLogging: {
    level: "verbose",
  },

  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify("/"),
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BASE_URL: JSON.stringify(process.env.BASE_URL || "/"),
      },
    }),

    new webpack.HotModuleReplacementPlugin(),

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new ModuleFederationPlugin({
      name: "gradelyCore",
      filename: "remoteEntry.js",
      exposes: {
        "./Welcome": "./src/components/Welcome.vue",
      },
      shared: {
        ...dependencies,
        // vue: { eager: true, singleton: true, requiredVersion: "^2.0.0" },
        // "vue-router": { eager: true, singleton: true },
        // vuex: { eager: true, singleton: true },
      },
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true, // enable hot module replacement
    open: true,
    compress: true,
    publicPath: "/",
    port: 8080,

    watchOptions: {
      poll: true,
    },
  },

  experiments: {
    topLevelAwait: true,
  },
};
