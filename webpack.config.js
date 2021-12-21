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
    // The below is unnecessary if we set the rule below for mjs files.
    // alias: {
    //   'apache-arrow': path.resolve(__dirname, 'node_modules/apache-arrow/Arrow.esnext.min.js'),
    //   // Doesn't build?
    //   // 'apache-arrow': path.resolve(__dirname, 'node_modules/@apache-arrow/ts/Arrow.ts'),
    // },
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        // This seems to mess with devtools - which now wants to find every individual library!
        // But this is a way to make arrow work without the alias above (which feels more hacky / brittle)
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
    ],
  }
};
