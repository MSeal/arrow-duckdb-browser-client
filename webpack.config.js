// const path = require('path');

// module.exports = {
//     target: 'node',
//     mode: 'development',
//     entry: './src/index.ts',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//         libraryTarget: 'umd',
//         chunkFormat: 'module',
//         publicPath: '/',
//     },
//     optimization: {
//       minimize: false,
//     },  
//     resolve: {
//         extensions: ['.ts', '.mjs', '.js']
//     },
//     module: {
//         // keeps a ref to the native require fn for dynamic loading
//         noParse: /\/nativeRequire.js$/,
//         rules: [
//             {
//                 test: /\.ts$/,
//                 use: {
//                     loader: 'ts-loader',
//                     options: { configFile: 'tsconfig.json' }
//                 }
//             },
//             {
//                 test: /\.m?js/,
//                 resolve: {
//                     fullySpecified: false
//                 }
//             },
//         ]
//     },
//     experiments: {
//       asyncWebAssembly: true,
//       layers: true,
//       // outputModule: true,
//       syncWebAssembly: true,
//       topLevelAwait: true,
//     }
// };


const path = require('path');

module.exports = {
  target: 'node',
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
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  }
};
