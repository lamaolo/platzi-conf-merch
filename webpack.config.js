const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // punto de entrada:
  entry: './src/index.js',
  // punto de salida de nuestro bundle optimizado:
  output: {
    // le indicamos que cree una carpeta 'dist' en la raiz del proyecto
    path: path.resolve(__dirname, 'dist'),
    //nombre del archivo resultante
    filename: 'bundle.js',
    publicPath: '/',
  },
  // que extensiones va a analizar webpack:
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    // Son elementos que nos ayudan por medio de loaders a detectar nuestro archivos y como trabajar con ellos, asi como entender los tipos y extensiones de archivos que tenemos en nuestro proyecto
    rules: [
      {
        test: /\.(js|jsx)$/, //todos los archivos que terminan con js/jsx,
        exclude: /node_modules/, // siempre hay que ignorar node_modules
        use: {
          loader: 'babel-loader', // para que nuestros archivos js y jsx pasen por babel
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      // Aqui agregamos los loaders de css, el proceso es el mismo para gregar un loader de SASS, scss, etc.
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  devServer: {
    // dirección de donde va a tomar los archivos que va a servir en el server
    contentBase: path.join(__dirname, 'dist'),
    // para que comprima los archivos (o no)
    compress: true,
    historyApiFallback: true,
    port: 3005,
  },
};
