const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
      
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'eos_vue_scheduler',
      libraryTarget: 'umd',
      globalObject: 'this'
        
    },
    target: ['browserslist:defaults, not ie <= 11'],
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],

    module:
    {
        rules: [
            {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
          {
            test: /\.css$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader", 
              // Translates CSS into CommonJS
              "css-loader",         
            ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {"useBuiltIns": "usage", "corejs": "3.8"}]],
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            }
          },
          {
            test: /\.png/,
            type: 'asset/resource'
          },
        ]
    }
};