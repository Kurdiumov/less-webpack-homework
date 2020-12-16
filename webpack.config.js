const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, options) => {
  const isProd = options.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/less-webpack-homework/"
    },
    devServer: {
      publicPath: "/",
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      hot: true,
      inline: true
    },
    optimization: {
      minimize: isProd,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          collapseWhitespace: isProd
        },
        filename: "index.html",
        publicPath: "./"
      })
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
        }
      ]
    }
  };
};
