const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../wwwroot/publish"),
    filename: "bundle.js",
    publicPath: 'publish/'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/, // ✅ Support for CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/, // ✅ Support for Sass
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    concatenateModules: true,
    flagIncludedChunks: true,
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    splitChunks: false,
    minimize: true, // Enable minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove comments
          }
        },
        extractComments: false, // Don't generate a LICENSE.txt file
      }),
    ],
  },
  plugins: [
    new TerserPlugin({
      terserOptions: {
        sourceMap: false
      }
    })
  ],
  devServer: {
    static: path.join(__dirname,'wwwroot'),
    compress: true,
    port: 3000,
    hot: true,
  },
};