const path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.ts',
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
  },
  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    alias: {
      'apache-arrow': path.resolve(__dirname, 'node_modules/apache-arrow/Arrow.d.ts'),
    },
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  }
};
