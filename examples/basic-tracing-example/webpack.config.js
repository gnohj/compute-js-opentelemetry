const path = require("path");
const webpack = require("webpack");

const webpackHelpers = require("@fastly/compute-js-opentelemetry/webpack-helpers");

module.exports = {
  entry: "./src/index.js",
  optimization: {
    // Set to false if you wish to be able to read
    // the minified code that will be generated at ./bin/index.js,
    // useful for debugging purposes.
    minimize: false,
  },
  target: "webworker",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "bin"),
    libraryTarget: "this",
  },
  module: {
    rules: [
      // Loaders go here.
      // e.g., ts-loader for TypeScript
    ],
  },
  plugins: [
    // Polyfills go here.
    // Used for, e.g., any cross-platform WHATWG,
    // or core nodejs modules needed for your application.
    // new webpack.ProvidePlugin({
    // }),
  ],
  externals: [
    ({request,}, callback) => {
      // Allow Webpack to handle fastly:* namespaced module imports by treating
      // them as modules rather than try to process them as URLs
      if (/^fastly:.*$/.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ],
  performance: {
    hints: false,
  },
};

module.exports = webpackHelpers.apply(module.exports);
