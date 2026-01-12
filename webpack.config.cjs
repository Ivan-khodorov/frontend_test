{
  const path = require('path');
  const fs = require('fs');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');

  const pagesDir = path.resolve(__dirname, 'src/pages');
  const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.ejs'));

  const htmlPlugins = pages.map(filename => {
    return new HtmlWebpackPlugin({
      filename: filename.replace('.ejs', '.html'),
      template: path.resolve(pagesDir, filename),
      chunks: ['main']
    });
  });

  module.exports = {
    entry: {
      main: './src/scripts/main.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: 'img/[name][hash][ext]'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      open: true,
      hot: true,
      watchFiles: ['src/**/*'],
    },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          use: [
            {
              loader: 'html-loader',
              options: {
                sources: false
              }
            },
            'template-ejs-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass')
              }
            }
          ]
        }
      ]
    },
    plugins: [
      ...htmlPlugins,
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/img'),
            to: path.resolve(__dirname, 'dist/img')
          }
        ]
      })
    ],
    ignoreWarnings: [
      {
        message: /legacy JS API is deprecated/
      }
    ]
  };
};
